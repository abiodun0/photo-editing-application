#Django Powered Photo Editing Application [![Circle CI](https://circleci.com/gh/andela-ashuaib/photo-editing-application/tree/master.svg?style=svg)](https://circleci.com/gh/andela-ashuaib/photo-editing-application/tree/master) [![Coverage Status](https://coveralls.io/repos/andela-ashuaib/photo-editing-application/badge.svg?branch=master&service=github)](https://coveralls.io/github/andela-ashuaib/photo-editing-application?branch=master)

### Challenge
Build an image editing app powered by Django

### Description
imagEditor is an image editing app allowing you to add different effects to your awesome image making it _"cooler"_


##### Features
- Sign in with facebook
- Apply up to 5 effects to your image
- Share your images with your friends on facebook
- View all uploaded images on screens larger than 992px (Desktop)
- Responsive design
- Live Edit of the image title
- Real time search of your uploaded image


### Dependencies
- [Pillow](https://github.com/python-pillow/Pillow)
- [Django](https://www.djangoproject.com/)
- [bootstrap v4](v4-alpha.getbootstrap.com)
- [material design icons](https://materialdesignicons.com/)
- [jquery](https://github.com/jquery/jquery)
- [react](https://facebook.github.io/react/)
- [redux](http://redux.js.org/)
- [redux-thunk](https://github.com/gaearon/redux-thunk)
- [sweetalert](http://t4t5.github.io/sweetalert/)
- [react-slick](https://github.com/akiran/react-slick)
- [react-dropzone](https://github.com/akiran/react-slick)
- [superagent](https://github.com/visionmedia/superagent)
- [lodash](https://lodash.com/docs)
- [webpack](https://webpack.github.io/)
- [toastr](https://github.com/CodeSeven/toastr)
- [react-dropzone](https://github.com/okonet/react-dropzone)

## Installation
1. Clone the repository into a Virtual Environment.
- Run `virtualenv <virtualenvname>` or `mkvirtualenv <virtualenvname>` if using virtualenv wrapper to create the virtual environment.
2. Install all the necessary requirements by running `pip install -r requirements.txt && npm install && bower install && webpack -p` within the virtual environment.
3. Configure your database configurations in a development.py and save in the settings folder
4. Create a .env.yml to hold all your environment variables, like your secret key, save in the same level as your README.md file (sample shown below)
5. Run `bower install` to install all front end dependencies. Please ensure you are on the same level with .bowerrc when you run this command
6. Run `python image_editor/manage.py collectstatic` to copy all your static files into the staticfiles directory
7. Run `python image_editor/manage.py makemigrations` and `python manage.py migrate` to create the necessary tables and everything required to run the application.
8. Run `python manage.py runserver` to run the app.
9. Send a request to be added as a collaborator to the facebook app to use facebook login or create your [facebook app](https://developers.facebook.com)
10. Run coverage `coverage run --source="imageditor" image_editor/manage.py test image_editor` to know how much the app is covered by automated testing.
11. View the report of the coverage on your terminal `coverage report`.
12. Produce the html of coverage result `coverage html`.

## Sample .env.yml format
```
SECRET_KEY:
    "43&&)c$kur=o%eym=im^zftcu9po6-e=5r8$jk#u4t+6q&t%c8"
FB_ID:
    "your facbeoook app id"
    ````

## imagEditor
Need to see the app for yourself?
[imagEditor](http://imageditor.herokuapp.com)