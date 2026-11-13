# CertiChain – Blockchain-Based Certificate Verification System

A decentralized certificate verification system built using **Solidity, Ethereum Blockchain, MetaMask, and JavaScript**.

CertiChain aims to simplify academic certificate verification by allowing colleges to issue certificates directly on the blockchain. Students can share their certificate details, and recruiters can independently verify their authenticity without contacting the college.

## Problem Statement

In the traditional certificate verification process, recruiters need to contact the respective college or institution to verify whether a certificate is genuine.

This process can be time-consuming and may involve manual verification.

## Proposed Solution

CertiChain uses blockchain technology to provide a transparent and tamper-resistant certificate verification system.

- Colleges can issue certificates through a smart contract.
- Certificate details are recorded on the blockchain.
- Recruiters can verify certificates using a unique Certificate ID.
- Certificates can be retrieved and downloaded using their stored document URI.
- College administrators can revoke certificates when required.

## Features

- **Issue Certificate:** College administrators can issue certificates to students.
- **Verify Certificate:** Recruiters can verify certificate authenticity using a Certificate ID.
- **Get Certificate:** Retrieve student details, course information, issue date and document link.
- **Revoke Certificate:** College administrators can revoke previously issued certificates.
- **MetaMask Integration:** Connect wallets to interact with the smart contract.
- **Access Control:** Only the college administrator can issue or revoke certificates.
- **Blockchain Validation:** Prevent duplicate certificate IDs and validate certificate status.

## Technology Stack

| Technology | Purpose |
|---|---|
| Solidity | Smart contract development |
| Ethereum | Blockchain network |
| Remix IDE | Smart contract compilation and deployment |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend functionality |
| Ethers.js | Blockchain interaction |
| MetaMask | Wallet connection |
| GitHub | Version control |
| Vercel | Frontend deployment |

## Project Structure

```text
Certificate-Verification-via-Blockchain/
│
├── contract/
│   └── certificate1.sol
│
├── D_app/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── Screenshots/
│
├── .gitignore
│
└── README.md
```

## How It Works

1. The college administrator connects their MetaMask wallet.
2. The administrator issues a certificate by entering the student's details.
3. The smart contract stores the certificate information on the blockchain.
4. The student shares their unique Certificate ID with the recruiter.
5. The recruiter enters the Certificate ID to verify the certificate.
6. The recruiter can retrieve certificate details and access the document.
7. If necessary, the college administrator can revoke the certificate.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sahas-2417/certificate-verification-blockchain.git
```

### 2. Open the Project

Open the downloaded project folder in Visual Studio Code.

### 3. Deploy the Smart Contract

- Open Remix IDE.
- Import `contract/certificate1.sol`.
- Compile the Solidity smart contract.
- Connect MetaMask using the appropriate network.
- Deploy the contract.
- Copy the deployed contract address.

### 4. Configure the Frontend

Open `D_app/script.js` and update the contract address:

```javascript
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

Ensure that the contract ABI in the JavaScript file matches the deployed Solidity contract.

### 5. Run the Application

Open `D_app/index.html` using the VS Code Live Server extension.

Connect MetaMask and start using the application.

## Smart Contract Functions

| Function | Description |
|---|---|
| `issueCertificate()` | Issues a new certificate |
| `verifyCertificate()` | Verifies certificate validity |
| `getCertificate()` | Retrieves certificate information |
| `revokeCertificate()` | Revokes an issued certificate |
| `certificateExists()` | Checks certificate existence |

## Important Notes

- The college administrator is the wallet that deploys