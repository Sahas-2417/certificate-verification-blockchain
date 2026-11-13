
// ============================================
// CERTICHAIN - DECENTRALIZED CERTIFICATE SYSTEM
// ============================================


// 1. CONTRACT ADDRESS
// IMPORTANT: Replace after deploying in Remix.

const CONTRACT_ADDRESS = "0xfbAC1BCf46Ea6EF01620C3c7E966b34bd50A875b";


// 2. SMART CONTRACT ABI
// Generated from CertificateVerification.sol

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "certificateId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "courseName",
        "type": "string"
      }
    ],
    "name": "CertificateIssued",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "certificateId",
        "type": "string"
      }
    ],
    "name": "CertificateRevoked",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_courseName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_documentURI",
        "type": "string"
      }
    ],
    "name": "issueCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateId",
        "type": "string"
      }
    ],
    "name": "revokeCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateId",
        "type": "string"
      }
    ],
    "name": "certificateExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collegeAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateId",
        "type": "string"
      }
    ],
    "name": "getCertificate",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateId",
        "type": "string"
      }
    ],
    "name": "verifyCertificate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]


// 3. GLOBAL VARIABLES

let provider = null;
let signer = null;
let contract = null;

let connectedAccount = null;
let collegeAdmin = null;


// 4. HTML ELEMENTS

const connectWalletBtn =
    document.getElementById("connectWallet");

const walletInfo =
    document.getElementById("walletInfo");


// 5. ERROR MESSAGE

function getErrorMessage(error) {

    console.error(error);

    if (error.code === 4001) {
        return "Transaction rejected by user.";
    }

    return error.reason ||
           error.shortMessage ||
           error.message ||
           "Something went wrong.";

}


// 6. DISPLAY MESSAGE

function showMessage(elementId, message, type = "") {

    const element = document.getElementById(elementId);

    element.textContent = message;

    element.className = "result " + type;

}


// 7. CONNECT WALLET

async function connectWallet() {

    try {

        if (!window.ethereum) {

            throw new Error(
                "MetaMask is not installed. Please install MetaMask."
            );

        }

        if (!window.ethers) {

            throw new Error(
                "Ethers.js library failed to load. Check your internet connection."
            );

        }

        if (!ethers.isAddress(CONTRACT_ADDRESS)) {

            throw new Error(
                "Invalid contract address. Paste your deployed Remix contract address in script.js."
            );

        }

        // Connect MetaMask

        provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        signer = await provider.getSigner();

        connectedAccount = await signer.getAddress();


        // Get blockchain network

        const network = await provider.getNetwork();

        console.log(
            "Connected Network Chain ID:",
            network.chainId.toString()
        );

        console.log(
            "Connected Wallet:",
            connectedAccount
        );


        // Check contract deployment

        const contractCode =
            await provider.getCode(CONTRACT_ADDRESS);

        if (contractCode === "0x") {

            throw new Error(
                "No contract found at this address on the connected network. Check Remix deployment and MetaMask network."
            );

        }


        // Connect smart contract

        contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );


        // Check college admin

        try {

            collegeAdmin = await contract.collegeAdmin();

        } catch (error) {

            throw new Error(
                "ABI mismatch: collegeAdmin() could not be decoded. Make sure you deployed the supplied CertificateVerification.sol contract."
            );

        }


        // Update frontend

        walletInfo.textContent =
            "Connected: " +
            connectedAccount.slice(0, 6) +
            "..." +
            connectedAccount.slice(-4);

        connectWalletBtn.textContent = "Wallet Connected";

        updateAdminAccess();


        alert("Wallet connected successfully!");


    } catch (error) {

        alert(getErrorMessage(error));

    }

}


// 8. ADMIN ACCESS CONTROL

function updateAdminAccess() {

    const isAdmin =
        connectedAccount &&
        collegeAdmin &&
        connectedAccount.toLowerCase() ===
        collegeAdmin.toLowerCase();


    document.getElementById("issueBtn").disabled =
        !isAdmin;

    document.getElementById("revokeBtn").disabled =
        !isAdmin;


    console.log("College Admin:", collegeAdmin);

    console.log("Is College Admin:", isAdmin);

}


// 9. CHECK CONNECTION

function checkConnection() {

    if (!contract) {

        alert("Please connect MetaMask first!");

        return false;

    }

    return true;

}


// 10. SAFE HTML DISPLAY

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(char) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];

    });

}


// 11. GET DOCUMENT LINK

function getDocumentLink(uri) {

    if (uri.startsWith("ipfs://")) {

        const cid = uri.substring(7).replace(/^ipfs\//, "");

        return "https://ipfs.io/ipfs/" + cid;

    }

    try {

        const url = new URL(uri);

        if (
            url.protocol === "https:" ||
            url.protocol === "http:"
        ) {

            return url.href;

        }

    } catch (error) {

        return null;

    }

    return null;

}


// 12. ISSUE CERTIFICATE

async function issueCertificate() {

    if (!checkConnection()) return;

    try {

        const id =
            document.getElementById("issueId").value.trim();

        const student =
            document.getElementById("studentName").value.trim();

        const course =
            document.getElementById("courseName").value.trim();

        const uri =
            document.getElementById("documentURI").value.trim();


        // Empty field validation

        if (!id || !student || !course || !uri) {

            throw new Error("Please fill all certificate details!");

        }


        // Document URI validation

        if (!getDocumentLink(uri)) {

            throw new Error(
                "Please enter a valid HTTP, HTTPS or IPFS document URI."
            );

        }


        // Duplicate certificate validation

        const exists =
            await contract.certificateExists(id);

        if (exists) {

            throw new Error(
                "Certificate ID already exists!"
            );

        }


        showMessage(
            "issueResult",
            "Please confirm the transaction in MetaMask..."
        );


        // Blockchain transaction

        const tx = await contract.issueCertificate(
            id,
            student,
            course,
            uri
        );


        showMessage(
            "issueResult",
            "Transaction submitted. Waiting for confirmation..."
        );


        await tx.wait();


        showMessage(
            "issueResult",
            "Certificate issued successfully! Transaction Hash: " +
            tx.hash,
            "success"
        );


        // Clear inputs

        document.getElementById("issueId").value = "";
        document.getElementById("studentName").value = "";
        document.getElementById("courseName").value = "";
        document.getElementById("documentURI").value = "";


    } catch (error) {

        showMessage(
            "issueResult",
            getErrorMessage(error),
            "error"
        );

    }

}


// 13. VERIFY CERTIFICATE

async function verifyCertificate() {

    if (!checkConnection()) return;

    try {

        const id =
            document.getElementById("verifyId").value.trim();


        if (!id) {

            throw new Error("Enter Certificate ID!");

        }


        const result =
            await contract.verifyCertificate(id);


        const isValid = result[0];

        const student = result[1];

        const course = result[2];

        const revoked = result[3];


        const output =
            document.getElementById("verifyResult");


        if (isValid && !revoked) {

            output.innerHTML = `

                <h3 class="success">
                    ✓ CERTIFICATE VERIFIED
                </h3>

                <p>
                    <b>Certificate ID:</b>
                    ${escapeHTML(id)}
                </p>

                <p>
                    <b>Student:</b>
                    ${escapeHTML(student)}
                </p>

                <p>
                    <b>Course:</b>
                    ${escapeHTML(course)}
                </p>

                <p>
                    <b>Status:</b>
                    VALID
                </p>

            `;

        } else {

            output.innerHTML = `

                <h3 class="error">
                    ✗ CERTIFICATE REVOKED
                </h3>

                <p>
                    This certificate is no longer valid.
                </p>

            `;

        }


    } catch (error) {

        showMessage(
            "verifyResult",
            getErrorMessage(error),
            "error"
        );

    }

}


// 14. GET CERTIFICATE DETAILS

async function getCertificate() {

    if (!checkConnection()) return;

    try {

        const id =
            document.getElementById("getId").value.trim();


        if (!id) {

            throw new Error("Enter Certificate ID!");

        }


        const result =
            await contract.getCertificate(id);


        const student = result[0];

        const course = result[1];

        const uri = result[2];

        const issueDate = Number(result[3]);

        const revoked = result[4];


        const date =
            new Date(issueDate * 1000).toLocaleString();


        const downloadLink =
            getDocumentLink(uri);


        const output =
            document.getElementById("getResult");


        output.innerHTML = `

            <h3>Certificate Details</h3>

            <p>
                <b>Certificate ID:</b>
                ${escapeHTML(id)}
            </p>

            <p>
                <b>Student:</b>
                ${escapeHTML(student)}
            </p>

            <p>
                <b>Course:</b>
                ${escapeHTML(course)}
            </p>

            <p>
                <b>Issue Date:</b>
                ${escapeHTML(date)}
            </p>

            <p>
                <b>Status:</b>

                <span class="${revoked ? "error" : "success"}">
                    ${revoked ? "REVOKED" : "VALID"}
                </span>

            </p>

            <p>
                <b>Document URI:</b>
                ${escapeHTML(uri)}
            </p>

            ${
                downloadLink
                ?
                `<a href="${escapeHTML(downloadLink)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    View / Download Certificate
                </a>`
                :
                "Document link unavailable."
            }

        `;


    } catch (error) {

        showMessage(
            "getResult",
            getErrorMessage(error),
            "error"
        );

    }

}


// 15. REVOKE CERTIFICATE

async function revokeCertificate() {

    if (!checkConnection()) return;

    try {

        const id =
            document.getElementById("revokeId").value.trim();


        if (!id) {

            throw new Error("Enter Certificate ID!");

        }


        // Check certificate existence

        const exists =
            await contract.certificateExists(id);


        if (!exists) {

            throw new Error(
                "Certificate does not exist!"
            );

        }


        // Check existing status

        const result =
            await contract.verifyCertificate(id);


        if (result[3]) {

            throw new Error(
                "Certificate is already revoked!"
            );

        }


        // Confirmation

        const confirmation = confirm(
            "Are you sure you want to revoke certificate " + id + "?"
        );


        if (!confirmation) return;


        showMessage(
            "revokeResult",
            "Please confirm transaction in MetaMask..."
        );


        // Revoke blockchain record

        const tx =
            await contract.revokeCertificate(id);


        showMessage(
            "revokeResult",
            "Waiting for blockchain confirmation..."
        );


        await tx.wait();


        showMessage(
            "revokeResult",
            "Certificate revoked successfully! Transaction Hash: " +
            tx.hash,
            "success"
        );


        document.getElementById("revokeId").value = "";


    } catch (error) {

        showMessage(
            "revokeResult",
            getErrorMessage(error),
            "error"
        );

    }

}


// 16. BUTTON EVENT LISTENERS

connectWalletBtn.addEventListener(
    "click",
    connectWallet
);


document.getElementById("issueBtn").addEventListener(
    "click",
    issueCertificate
);


document.getElementById("verifyBtn").addEventListener(
    "click",
    verifyCertificate
);


document.getElementById("getBtn").addEventListener(
    "click",
    getCertificate
);


document.getElementById("revokeBtn").addEventListener(
    "click",
    revokeCertificate
);


// 17. METAMASK ACCOUNT CHANGE

if (window.ethereum) {

    window.ethereum.on("accountsChanged", function() {

        window.location.reload();

    });


    window.ethereum.on("chainChanged", function() {

        window.location.reload();

    });

}
