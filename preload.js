const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
	title: "Project Era"
})