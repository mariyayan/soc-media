
const inputsDataObj = {
	login: {type: 'text', placeholder: 'login' , name: 'login', validation: {required: 'login is required', pattern: { value: /^[a-zа-я0-9]{2,10}$/i, message: 'not shorter than 2, not longer 15'}}},
	password: {type: 'password', placeholder: 'password' , name: 'password', validation: {required: 'password is required', pattern: { value: /^[a-zа-я0-9]{5,15}$/i, message: 'not shorter than 5, not longer 15'}}},
	name: {type: 'text', placeholder: 'name' , name: 'name', validation: {required: 'name is required', pattern: { value: /^[a-zа-я]{1,10}$/i, message: 'not shorter than 1, not longer 10'}}},
	imgSrc: {type: 'file', placeholder: 'photo' , name: 'imgSrc', validation: {required: 'choose a photo'}},
	search: {type: 'text', placeholder: 'search' , name: 'search',  validation: {required: 'value is required', pattern: { value: /^[a-zа-я]{1,10}$/i, message: 'not shorter than 1, not longer 10'}}},
    text: {type: 'text', placeholder: 'post text' , name:'postText', validation: {required: 'value is required', pattern: { value: /^[a-zа-я0-9]{1,}$/i, message: 'not shorter than 1 symbol'}}},
    imgSrcs: {type: 'file', placeholder: 'post pictures' , name: 'postPhotos', validation: {required: 'choose a photo'}},
};


export const formsData = {
	registrationForm : {
		inputs: [inputsDataObj.login, inputsDataObj.password, inputsDataObj.name, inputsDataObj.imgSrc],
		formName: 'Registration',
		path: '/registration',
	},

	authenticationForm : {
		inputs: [inputsDataObj.login, inputsDataObj.password],
		formName: 'Authentication',
		path: '/authentication',
	},

	changeNameForm : {
		inputs: [inputsDataObj.name],
		path: '/setUserName',
	},

	changePhotoForm : {
		inputs: [{...inputsDataObj.imgSrc}],
		path: '/setUserPhoto',
	},

	addPostForm : {
		inputs: [inputsDataObj.text, inputsDataObj.imgSrcs],
		path: '/createPost',
	},

	searchForm : {
		inputs: [inputsDataObj.search],
	},
};