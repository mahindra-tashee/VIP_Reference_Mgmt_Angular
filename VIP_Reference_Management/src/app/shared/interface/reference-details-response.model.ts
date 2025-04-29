export interface VipReferenceDocumentResponse {
    fileName: string;
    filePath: string; // Optional if needed
    documentType: string;
    comments: string;
  }
  
  export interface VipReferenceDetailsResponse {
    referenceId: number;
    referenceNo: string;
    subject: string;
    receivedDate: string; // Use string or Date depending on how you handle it
    dateOfLetter: string; // Use string or Date depending on how you handle it
    dateOfEntry: string; // Use string or Date depending on how you handle it
    nameOfDignitary: string;
    emailId: string;
    designation: string;
    state: string;
    constituency: string;
    prirority: string;
    categoryOfSubject: string;
    subCategoryOfSubject: string;
    currentQueue: string;
    documents: VipReferenceDocumentResponse[]; // List of documents
  }