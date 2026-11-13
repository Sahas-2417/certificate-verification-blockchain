
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateVerification {

    address public collegeAdmin;

    struct Certificate {
        string certificateId;
        string studentName;
        string courseName;
        string documentURI;
        uint256 issueDate;
        bool exists;
        bool revoked;
    }

    mapping(bytes32 => Certificate) private certificates;

    event CertificateIssued(
        string certificateId,
        string studentName,
        string courseName
    );

    event CertificateRevoked(string certificateId);

    // College deploying the contract becomes admin
    constructor() {
        collegeAdmin = msg.sender;
    }

    // Admin-only access
    modifier onlyCollege() {
        require(
            msg.sender == collegeAdmin,
            "Only college admin can perform this action"
        );
        _;
    }

    // 1. ISSUE CERTIFICATE
    function issueCertificate(
        string memory _certificateId,
        string memory _studentName,
        string memory _courseName,
        string memory _documentURI
    ) public onlyCollege {

        require(bytes(_certificateId).length > 0,
            "Certificate ID cannot be empty");

        require(bytes(_studentName).length > 0,
            "Student name cannot be empty");

        require(bytes(_courseName).length > 0,
            "Course name cannot be empty");

        require(bytes(_documentURI).length > 0,
            "Document URI cannot be empty");

        bytes32 id = keccak256(abi.encodePacked(_certificateId));

        require(!certificates[id].exists,
            "Certificate ID already exists");

        certificates[id] = Certificate({
            certificateId: _certificateId,
            studentName: _studentName,
            courseName: _courseName,
            documentURI: _documentURI,
            issueDate: block.timestamp,
            exists: true,
            revoked: false
        });

        emit CertificateIssued(
            _certificateId,
            _studentName,
            _courseName
        );
    }

    // 2. VERIFY CERTIFICATE
    function verifyCertificate(
        string memory _certificateId
    ) public view returns (
        bool,
        string memory,
        string memory,
        bool
    ) {

        bytes32 id = keccak256(abi.encodePacked(_certificateId));

        require(certificates[id].exists,
            "Certificate does not exist");

        Certificate memory cert = certificates[id];

        return (
            !cert.revoked,
            cert.studentName,
            cert.courseName,
            cert.revoked
        );
    }

    // 3. GET CERTIFICATE
    function getCertificate(
        string memory _certificateId
    ) public view returns (
        string memory,
        string memory,
        string memory,
        uint256,
        bool
    ) {

        bytes32 id = keccak256(abi.encodePacked(_certificateId));

        require(certificates[id].exists,
            "Certificate does not exist");

        Certificate memory cert = certificates[id];

        return (
            cert.studentName,
            cert.courseName,
            cert.documentURI,
            cert.issueDate,
            cert.revoked
        );
    }

    // 4. REVOKE CERTIFICATE
    function revokeCertificate(
        string memory _certificateId
    ) public onlyCollege {

        bytes32 id = keccak256(abi.encodePacked(_certificateId));

        require(certificates[id].exists,
            "Certificate does not exist");

        require(!certificates[id].revoked,
            "Certificate already revoked");

        certificates[id].revoked = true;

        emit CertificateRevoked(_certificateId);
    }

    // 5. CHECK CERTIFICATE EXISTENCE
    function certificateExists(
        string memory _certificateId
    ) public view returns (bool) {

        bytes32 id = keccak256(abi.encodePacked(_certificateId));

        return certificates[id].exists;
    }
}
