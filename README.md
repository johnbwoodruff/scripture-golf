# Scripture Golf

This is LDS Scripture Golf, a classic Sunday School scripture trivia game. It is written with [Ionic](https://ionic.io) and [Capacitor](https://capacitorjs.com).

## Developing

You need both the Ionic CLI and Angular CLI installed.

```shell
$ npm install -g @ionic/cli @angular/cli
```

Once you've cloned the project, run `npm install` to install project dependencies. Do not use yarn as this project is built with npm in mind and may not work as expected with yarn.

To serve the application locally in a browser, simply run `ionic serve` or `ionic serve --lab` to run it in the Ionic Lab.

To get your changes to run in a native environment (iOS or Android device/emulator) simply run the following commands upon making your desired changes:

```shell
$ ionic build
$ npx cap sync # or `npx cap copy` if you haven't made plugin changes
# Open the desired project
$ npx cap open ios
$ npx cap open android
```

You can then run your app on a device or emulator using Xcode or Android Studio.

## Production Build

To deploy to the various app stores, run the following commands to build your app:

```shell
$ ionic build --prod
$ npx cap sync
```

Then open your project in Xcode or Android Studio and generate your signed build from there as with a normal iOS or Android app.
