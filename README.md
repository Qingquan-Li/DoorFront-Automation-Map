DoorFront-Automation-Map

# How to run this website?

## 1. Download the source code

Source code: https://github.com/Qingquan-Li/DoorFront-Automation-Map/archive/refs/heads/main.zip

You can open the code with [VS Code](https://code.visualstudio.com/) or other IDEs.

## 2. Create a google maps api key

How to create: https://developers.google.com/maps/documentation/javascript/get-api-key

## 3. Configure your google maps api key
Open the `.env.local` file, replace `YOUR API KEY` with your Google Maps API key.

```
VITE_API_KEY=YOUR API KEY
```

## 4. Install Node.js and npm

How to install: https://nodejs.org/

`npm` (short for Node Package Manager) is installed when you install Node.js.

## 5. Install the required libraries

Run this command in the project root directory:

```bash
npm install
```

## 6. Run the website

Run this command in the project root directory:

```bash
npm run dev
```
