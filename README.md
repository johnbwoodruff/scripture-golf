# Scripture Golf

This is LDS Scripture Golf, a classic Sunday School scripture trivia game. It is written in [Angular](https://angular.dev) with [Capacitor](https://capacitorjs.com).

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Working with Capacitor

Once you've made changes you would like to sync to your iOS and Android projects, run `npm run sync`. This will run a production build and sync the built assets to the native projects. You can then use the following commands to work with the native projects:

```shell
# Open the native projects in XCode or Android Studio
$ npx cap open ios
$ npx cap open android
# Run the project on a device or simulator
$ npx cap run ios
$ npx cap run android
```

## General Architecture

This project is built using [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/). The icons are [Lucide](https://lucide.dev/) icons. For state management the project utilizes [SignalStore](https://ngrx.io/guide/signals/signal-store) from the NgRx team.
