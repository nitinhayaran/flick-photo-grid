Express based backend application with React frontend.

## Requirements:
- Node 12.3.1
- Redis

## Setup
#### API (Backend)
1. `cd api` go into api directory
2. `yarn install` install all the required packages
3. `node index.js` run api server

Redis server must be running on port `6379`, otherwise modify connection parameter in `index.js`.

#### WEB (Frontend)
1. `yarn run build` to build frontend
2. serve start content from `build` folder

NOTE : To serve stuff locally during development can also run `yarn run start` which would start serving frontend in development mode.
You should set `REACT_APP_API_URL` environment variable to make calls to backend. Currently its defaulted to `http://localhost:8000`.