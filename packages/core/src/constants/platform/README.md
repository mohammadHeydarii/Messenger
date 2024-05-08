# platform

It allows you to know about the user's platform. Although it uses the Platform API of React Native, we have done some customization to suit our project better.

Available properties are:

- isDesktop
- isPwa
- isWeb
- isNative
- select
- os

> You have access to all of the built-in features of React Native Platform. Just call each one of them that you desire : )

> isDesktop, isPwa, and isWeb checks each platform and returns a boolean.

> isNative checks whether the native features should be true or false.

> os returns the name of the platform that the user is using.

## select

Well, this beneficial feature needs a little explanation.

Probably you already know about _Platform.select_ of React Native. It's somehow like that, but as you can guess we have done some customization on this feature too : )

It's a headache to set some conditions for each platform. As you know, there are some differences between the looks of apps on Android, ios, Web, Desktop, and PWA. So, every time you must add some conditions to achieve your desired look.

```js


...

container: Platform.select({
    web: {width: 700},
    pwa: {width: 400},
    ios: {width: 370, backgroundColor: 'red'},
    android: {width: 350, backgroundColor: 'purple'},
})
```
