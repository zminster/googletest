const path = require('path');
const NodeGoogleDrive = require('node-google-drive-new');

const YOUR_ROOT_FOLDER = '1_Of_S3rzdZq9pmIcS4YoSdD3jCgkl0f-',
  PATH_TO_CREDENTIALS = path.resolve(`${__dirname}/key.json`);

async function test() {

	const creds_service_user = require(PATH_TO_CREDENTIALS);

	// connect to google drive using service account
	const googleDriveInstance = new NodeGoogleDrive({
		ROOT_FOLDER: YOUR_ROOT_FOLDER
	});

	let gdrive = await googleDriveInstance.useServiceAccountAuth(
		creds_service_user
	);

	// List Folders under the root folder
	let folderResponse = await googleDriveInstance.listFolders(
		YOUR_ROOT_FOLDER,
		null,
		false
	);

	// loop through and find the one called "Source Files"
	let sourceFilesFolder;
	folderResponse.folders.forEach((folder) => {
		if (folder.name == "Source Files")
			sourceFilesFolder = folder.id;
	});

	let fileList = await googleDriveInstance.list({
		fileId: sourceFilesFolder
	});

	let testFile = fileList.files[0];
	let fileName = fileList.files[0]

	await googleDriveInstance.getFile(testFile, __dirname);

	await googleDriveInstance.create({
		source: "Whatever.docx",
		parentFolder: sourceFilesFolder,
		name: "Does it work?"
	});

	// Create a folder under your root folder
	/*let newFolder = { name: 'folder_example' + Date.now() },
		createFolderResponse = await googleDriveInstance.createFolder(
		YOUR_ROOT_FOLDER,
		newFolder.name
	);

	newFolder.id = createFolderResponse.id;

	console.log(`Created folder ${newFolder.name} with id ${newFolder.id}`);*/
}

test();
