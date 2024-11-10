# **WebRTC meeting service using [mediasoup](https://mediasoup.org).**

## EduMeet WebRTC with new features.

| Feature  | Description |
| ------------- | ------------- |
| **New video layouts** | Filmstrip Slider and L1. |
| **Transfer List** | Easily adjust the order and visibility of other participants in video layouts |
| **Automated testing and CI support** | Automatic E2E testing with [Playwright](https://playwright.dev/). Tests can be run locally and with GitHub Actions.   |

## Related resources before installation

Official website: [edumeet.org](https://edumeet.org)

Official (Original) edumeet GitHub repository: [edumeet](https://github.com/edumeet/edumeet)

Official (Original) edumeet-docker GitHub repository: [edumeet-docker](https://github.com/edumeet/edumeet-docker)

# Installation 

See here for my [Docker](https://github.com/csiziszebasztian/edumeet-szd-docker) installation procedures.

Installation example is based on Debian/Ubuntu Linux operating system. Tested on Ubuntu 20.04 LTS.

1. Install [NodeJS](https://nodejs.org/en) 16.X with [NVM](https://github.com/nvm-sh/nvm).

    1.1 Install [NVM](https://github.com/nvm-sh/nvm#install--update-script).

    1.2 Install NodeJS 16.X with NVM.
```bash
nvm install v16.20.2
```

2. Install [Yarn](https://yarnpkg.com/) package manager with npm. [Source](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

```bash
npm install --global yarn
```
3. Install all required dependencies
```bash
sudo apt update && sudo apt install -y curl git python-is-python3 python3-pip build-essential redis openssl libssl-dev pkg-config
```	
4. Enable and start redis service. More info in the [redis home page](https://redis.io/).
```bash
sudo systemctl enable redis-server
sudo systemctl start redis-server
```
5. Clone edumeet-szd git repository
```bash
git clone https://github.com/csiziszebasztian/edumeet-szd
cd edumeet-szd
```
### Build

```bash
cd app
yarn && yarn build

cd ../server
yarn && yarn build
```
### Run

1. Server

```bash
cd server
yarn start
```

2. Application 

```bash
cd app
yarn start
```
3. Test your service in a webRTC enabled browser: `https://yourDomainOrIPAdress:4443`

4. If you see "Warning: Potential Security Risk Ahead" click on the "Advanced..." button and click on the "Accept the Risk and Continue" button. 

5. If you cannot enter one of the rooms, you can right-click in your browser. Select "inspectet" or "devtools". Here look for the console. In the console you will see error messages like this: "The Same Origin Policy disallows...". Click on the error link. Accept the threat again here. Return to the page of the currently running edumeet and enter the room.

## Playwright

Basic testing with [Playwright](https://playwright.dev/). If both the app and the server are running. In the app folder, run the following commands.

Run all test.

```bash
yarn playwright test
```

Show report.

```bash
yarn playwright show-report
```

Run specific test.

```bash
yarn playwright test login-page.spec.ts
```

Tracer mode.

```bash
yarn playwright test --trace on
```

## Ports and firewall
| Port | protocol | description |
| ---- | ----------- | ----------- |
|  443 | tcp | default https webserver and signaling - adjustable in `server/config/config.yaml`) |
| 4443 | tcp | default `yarn start` port for developing with live browser reload, not needed in production environments - adjustable in app/package.json) |
| 40000-49999 | udp, tcp | media ports - adjustable in `server/config/config.yaml` |

## Load balanced installation

To deploy this as a load balanced cluster, have a look at [HAproxy](/docs/HAproxy.md).

## Learning management integration

To integrate with an LMS (e.g. Moodle), have a look at [LTI](LTI/LTI.md).

## TURN configuration

If you are part of the GEANT eduGAIN, you can request your turn api key at [https://turn.geant.org/](https://turn.geant.org/)
	
You need an additional [TURN](https://github.com/coturn/coturn)-server for clients located behind restrictive firewalls! 
Add your server and credentials to `server/config/config.yaml`

## License

MIT License (see `LICENSE.md`)

Contributions to this work were made on behalf of the GÉANT project, a project that has received funding from the European Union’s Horizon 2020 research and innovation programme under Grant Agreement No. 731122 (GN4-2). On behalf of GÉANT project, GÉANT Association is the sole owner of the copyright in all material which was developed by a member of the GÉANT project.

GÉANT Vereniging (Association) is registered with the Chamber of Commerce in Amsterdam with registration number 40535155 and operates in the UK as a branch of GÉANT Vereniging. Registered office: Hoekenrode 3, 1102BR Amsterdam, The Netherlands. UK branch address: City House, 126-130 Hills Road, Cambridge CB2 1PQ, UK.