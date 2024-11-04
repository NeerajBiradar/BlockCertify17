import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
import React, { useState } from "react";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react"


const contract = getContract({
  client,
  chain: defineChain(59141),
  address: "0x094542EB1E269915Afd5e924001B2eDfe7d633A0"
});

function Generate() {
  const account = useActiveAccount();

  let [signature, setSignature] = useState("");
  let [stname, setStname] = useState("");
  let [studentID, setStudentID] = useState("");
  let [course, setCourse] = useState("");
  let [organization, setOrganization] = useState("");
  let [dateOfIssue, setDateofIssue] = useState("");
  let [title, setTitle] = useState("");

  const { mutate: sendTransaction } = useSendTransaction();

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all fields are filled
    if (!signature || !stname || !studentID || !course || !organization || !dateOfIssue || !title) {
      alert("Please fill in all fields before generating the certificate.");
      return; // Exit the function if any field is empty
    }
    // Generate the unique certificate ID
    const transaction = prepareContractCall({
      contract,
      method: "function issueCertificate(string signature, string name, string studentID, string course, string organization, string dateOfIssue, string title) returns ((string certificateID, string name, string studentID, string course, string organization, string dateOfIssue, string title))",
      params: [signature, stname, studentID, course, organization, dateOfIssue, title]
    });
    sendTransaction(transaction); // Wait for the transaction to complete

    // Clear all fields after transaction
    setSignature("");
    setStname("");
    setStudentID("");
    setCourse("");
    setOrganization("");
    setDateofIssue("");
    setTitle("");
  };

  return (
    <div
      className="flex flex-col items-center justify-center mt-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060B0F", minHeight: "100vh" }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 ">
        Generate Certificate
      </h2>
      <form
        className="bg-[#060B0F] p-6 sm:p-8 rounded-xl w-full max-w-md shadow-lg"
        onSubmit={handleSubmit}
      >
        {[
          "email",
          "uid",
          "candidate_name",
          "course_name",
          "org_name",
          "date_of_issue",
          "title"
        ].map((field, index) => (
          <div className="mb-4" key={index}>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor={field}
            >
              {field
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </label>
            <input
              name={field}
              value={field === "email" ? signature :
                field === "uid" ? studentID  :
                  field === "candidate_name" ? stname:
                    field === "course_name" ? course :
                      field === "org_name" ? organization :
                        field === "date_of_issue" ? dateOfIssue :
                          field === "title" ? title : ""}
              onChange={(e) => {
                if (field === "email") setSignature(e.target.value.toUpperCase());
                else if (field === "uid") setStudentID(e.target.value.toUpperCase());
                else if (field === "candidate_name") setStname(e.target.value.toUpperCase());
                else if (field === "course_name") setCourse(e.target.value.toUpperCase());
                else if (field === "org_name") setOrganization(e.target.value.toUpperCase());
                else if (field === "date_of_issue") setDateofIssue(e.target.value.toUpperCase());
                else if (field === "title") setTitle(e.target.value.toUpperCase());
              }}
              type={field === "date_of_issue" ? "date" : "text"}
              className="shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
              placeholder={field
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
              required
            />
          </div>
        ))}
        <ConnectButton client={client} />
        <div className="flex items-center justify-center">
          <button
            className="bg-[#202d37] hover:text-[#202d37] hover:bg-[#94a3ad] text-white py-2 px-4 mt-2 rounded-xl focus:outline-none focus:shadow-outline w-full transition-transform transform hover:scale-105"
            type="submit"
          >
            Generate Certificate
          </button>
        </div>
      </form>
    </div>
  );
}

export default Generate;
