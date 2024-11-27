import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, contract } from "../client";
import React, { useState, useContext } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { TransactionButton } from "thirdweb/react";
import { Context12 } from "./ContextProvide";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Import PDF generation libraries
import { sha256 } from 'js-sha256';

function Generate() {
  const context = useContext(Context12);
  const publisher = context?.institute;
  const { mutate: sendTransaction } = useSendTransaction();

  let [signature, setSignature] = useState("");
  let [stname, setStname] = useState("");
  let [studentID, setStudentID] = useState("");
  let [course, setCourse] = useState("");
  let [organization, setOrganization] = useState("");
  let [dateOfIssue, setDateofIssue] = useState("");
  let [imageURL, setImageURL] = useState("");
  let [certificateID, setCertificateID] = useState(""); // New state for certificateID

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    page.drawText(organization, { x: 50, y: 350, size: 20, font, color: rgb(0, 0, 0) });
    page.drawText("Certificate of Completion", { x: 50, y: 300, size: 25, font, color: rgb(0, 0, 0) });
    page.drawText(`This is to certify that ${stname} (UID: ${studentID})`, { x: 50, y: 250, size: 14, font });
    page.drawText(`has successfully completed the course: ${course}`, { x: 50, y: 230, size: 14, font });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Certificate.pdf";
    link.click();
  };

  const generateUniqueCertificateID = () => {
    const data = `${signature}-${studentID}-${publisher}`;
    return sha256(data); // Generate SHA-256 hash
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#060B0F] p-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Generate Certificate</h2>
      <form
        className="bg-[#060B0F] max-w-6xl p-8 rounded-xl w-full shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            "email",
            "unique_id",
            "candidate_name",
            "course_name",
            "org_name",
            "date_of_issue",
            "image url",
            "publisher"
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-white text-sm font-bold mb-2" htmlFor={field}>
                {field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
              </label>
              <input
                name={field}
                value={
                  field === "email" ? signature :
                    field === "unique_id" ? studentID :
                      field === "candidate_name" ? stname :
                        field === "course_name" ? course :
                          field === "org_name" ? organization :
                            field === "date_of_issue" ? dateOfIssue :
                              field === "image url" ? imageURL :
                                field === "publisher" ? publisher : context?.institute
                }
                onChange={(e) => {
                  if (field === "email") setSignature(e.target.value.toLowerCase());
                  else if (field === "unique_id") setStudentID(e.target.value.toLowerCase());
                  else if (field === "candidate_name") setStname(e.target.value.toLowerCase());
                  else if (field === "course_name") setCourse(e.target.value.toLowerCase());
                  else if (field === "org_name") setOrganization(e.target.value.toLowerCase());
                  else if (field === "date_of_issue") setDateofIssue(e.target.value.toLowerCase());
                  else if (field === "image url") setImageURL(e.target.value.toLowerCase());
                }}
                type={field === "date_of_issue" ? "date" : "text"}
                className="w-full py-2 px-3 rounded-xl text-white bg-[#ffffff1a] border-transparent focus:outline-none focus:ring-2 focus:ring-[#94a3ad] transition-transform hover:scale-105"
                placeholder={field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toLowerCase())}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-white text-sm font-bold mb-2" htmlFor="certificateID">
            Certificate ID
          </label>
          <input
            id="certificateID"
            value={certificateID}
            readOnly
            className="w-full py-2 px-3 rounded-xl text-white bg-[#ffffff1a] border-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-between mt-6">
          <ConnectButton client={client} />
          <TransactionButton
          
           disabled={
            !signature || !stname || !studentID || !course || !organization || !dateOfIssue || !publisher || !imageURL
          }
            onClick={() => {
              if (!signature || !stname || !studentID || !course || !organization || !dateOfIssue || !publisher || !imageURL) {
                alert("Please fill in all fields before generating the certificate.");
                return;
              }
              const generatedCertificateID = generateUniqueCertificateID(); // Generate unique certificate ID
              setCertificateID(generatedCertificateID); // Set the certificateID state
              console.log(certificateID)
            }}

            transaction={() => prepareContractCall({
              contract,
              method: "function issueCertificate(string signature, string certificateID, string name, string studentID, string course, string organization, string dateOfIssue, string publisher, string imageURL) returns ((string certificateID, string name, string studentID, string course, string organization, string dateOfIssue, string publisher, string imageURL))",
              params: [signature, generateUniqueCertificateID(), stname, studentID, course, organization, dateOfIssue, publisher, imageURL]
            })}

            onTransactionConfirmed={((tx) => {
              console.log(tx)
              alert("Certificate generated")
              setSignature("");
              setStname("");
              setStudentID("");
              setCourse("");
              setOrganization("");
              setDateofIssue("");
              setImageURL("");
              setCertificateID("")
            })}
            onError={(error) => {
              alert(error.message)
              setSignature("");
              setStname("");
              setStudentID("");
              setCourse("");
              setOrganization("");
              setDateofIssue("");
              setImageURL("");
              setCertificateID("")
            }}
          >
            Generate Certificate ID
          </TransactionButton>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              generatePDF(); // Call the PDF generation function
            }}
            className="bg-[#202d37] hover:bg-[#94a3ad] hover:text-[#202d37] text-white py-2 px-4 rounded-xl transition-transform hover:scale-105 focus:outline-none focus:shadow-outline"
          >
            Download Certificate
          </button>
        </div>

      </form>
    </div>
  );
}

export default Generate;
