"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo = require("appolo-http");
let ClientsManager = class ClientsManager {
    constructor() {
        this._clients = {};
    }
    initialize() {
        this.io.sockets.on('connection', this._onSocketConnection.bind(this));
    }
    getClientById(id) {
        return this._clients[id];
    }
    _onSocketConnection(socket) {
        let socketClient = this.createSocketClient(socket);
        socketClient.on('disconnect', this._onSocketDisconnected, this);
        this._clients[socketClient.getId()] = socketClient;
    }
    _onSocketDisconnected(socketClient) {
        socketClient.un('disconnect', this._onSocketDisconnected, this);
        let socketId = socketClient.getId();
        this._clients[socketId] = null;
        delete this._clients[socketId];
    }
};
tslib_1.__decorate([
    appolo.inject()
], ClientsManager.prototype, "io", void 0);
tslib_1.__decorate([
    appolo.injectFactoryMethod("socketClient")
], ClientsManager.prototype, "createSocketClient", void 0);
tslib_1.__decorate([
    appolo.initMethod()
], ClientsManager.prototype, "initialize", null);
ClientsManager = tslib_1.__decorate([
    appolo.define(),
    appolo.singleton()
], ClientsManager);
exports.ClientsManager = ClientsManager;
//# sourceMappingURL=clientsManager.js.map