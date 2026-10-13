const bcrypt = require('bcryptjs');

// Lightweight zero-dependency in-memory document store with MongoDB/Mongoose API compatibility
class InMemoryCollection {
  constructor(name) {
    this.name = name;
    this.docs = [];
  }

  _clone(doc) {
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  }

  _matchesQuery(doc, query = {}) {
    for (const key of Object.keys(query)) {
      if (key === '$or') {
        const orConditions = query['$or'];
        const matched = orConditions.some((cond) => this._matchesQuery(doc, cond));
        if (!matched) return false;
        continue;
      }
      if (key === '_id') {
        const val = query._id;
        if (val && typeof val === 'object' && val.$ne) {
          if (doc._id === val.$ne.toString()) return false;
        } else if (doc._id !== val?.toString()) {
          return false;
        }
        continue;
      }
      const queryVal = query[key];
      const docVal = doc[key];

      if (queryVal instanceof RegExp) {
        if (!queryVal.test(String(docVal || ''))) return false;
      } else if (queryVal && typeof queryVal === 'object' && queryVal.$regex) {
        const regex = new RegExp(queryVal.$regex, queryVal.$options || '');
        if (!regex.test(String(docVal || ''))) return false;
      } else if (queryVal && typeof queryVal === 'object' && queryVal.$in) {
        const inArray = queryVal.$in;
        const hasMatch = (Array.isArray(docVal) ? docVal : [docVal]).some((v) =>
          inArray.some((item) => (item instanceof RegExp ? item.test(String(v)) : item === v))
        );
        if (!hasMatch) return false;
      } else if (docVal !== queryVal) {
        return false;
      }
    }
    return true;
  }

  async countDocuments() {
    return this.docs.length;
  }

  async insertMany(items) {
    const created = items.map((item) => {
      const doc = {
        ...this._clone(item),
        _id: 'mem_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.docs.push(doc);
      return this._decorateDoc(doc);
    });
    return created;
  }

  _decorateDoc(doc) {
    if (!doc) return null;
    const cloned = this._clone(doc);

    // Attach Mongoose helper methods
    cloned.save = async function () {
      this.updatedAt = new Date();
      return this;
    };
    cloned.markModified = function () {};
    cloned.deleteOne = async () => {
      const idx = this.docs.findIndex((d) => d._id === cloned._id);
      if (idx !== -1) this.docs.splice(idx, 1);
      return { acknowledged: true };
    };

    if (cloned.password) {
      cloned.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
    }

    return cloned;
  }

  find(query = {}) {
    const results = this.docs.filter((d) => this._matchesQuery(d, query)).map((d) => this._decorateDoc(d));
    const chain = {
      sort: (sortObj = {}) => {
        return chain;
      },
      populate: (field, select) => {
        return chain;
      },
      then: (resolve, reject) => {
        resolve(results);
      },
    };
    return chain;
  }

  findOne(query = {}) {
    const doc = this.docs.find((d) => this._matchesQuery(d, query));
    const decorated = this._decorateDoc(doc);

    const chain = {
      populate: (field) => chain,
      select: (fields) => chain,
      then: (resolve, reject) => resolve(decorated),
    };
    return chain;
  }

  async findById(id) {
    const doc = this.docs.find((d) => d._id === id?.toString());
    const decorated = this._decorateDoc(doc);
    const chain = {
      populate: (field) => chain,
      select: (fields) => chain,
      then: (resolve, reject) => resolve(decorated),
    };
    return chain;
  }

  async create(data) {
    let password = data.password;
    if (password && !password.startsWith('$2a$') && !password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const doc = {
      ...this._clone(data),
      password,
      _id: 'mem_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.docs.push(doc);
    return this._decorateDoc(doc);
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    const idx = this.docs.findIndex((d) => d._id === id?.toString());
    if (idx === -1) return null;

    const existing = this.docs[idx];
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.docs[idx] = updated;
    return this._decorateDoc(updated);
  }
}

const memoryStore = {
  users: new InMemoryCollection('User'),
  templates: new InMemoryCollection('Template'),
  userSites: new InMemoryCollection('UserSite'),
};

module.exports = memoryStore;
