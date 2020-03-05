import { API } from "aws-amplify";

// Create new note
export const createNote = ({ content, attachment }) => {
  return API.post("notes", `/notes`, { body: { content, attachment } });
};
