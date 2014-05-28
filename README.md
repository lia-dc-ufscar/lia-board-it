lia-board-it
============

Express yourself and share your ideas through an online board!

To create your own instance:

Make sure you have meteor and mrt installed on your computer.
If you don't, just 

	curl https://install.meteor.com | /bin/sh" to install meteor

and to install meteorite:

	 npm install -g meteorite

If you need root access, do 

	sudo -H npm install -g meteorite"

Having those installed, now you can do

	mrt add bootstrap-3

	mrt add streams

And to run your instance, you can run

	meteor

inside your app folder!

To deploy your meteor app on heroku: (source: https://github.com/oortcloud/heroku-buildpack-meteorite) 

	heroku create "nameofyourapp" --stack cedar --buildpack https://github.com/oortcloud/heroku-buildpack-meteorite.git

	heroku config:add ROOT_URL=http://your.domain.com

	git push heroku master
