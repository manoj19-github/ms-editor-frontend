import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { ReactNode } from "react";

const CompilerModal = ({ open, setOpen, children }: ICompilerModal) => {
  return (
    <>
      <CModal visible={open} size="lg" onClose={() => setOpen(false)}>
        <CModalHeader className="bg-[#0f172a] text-white">
          <CModalTitle>Compiler Result</CModalTitle>
        </CModalHeader>
        <CModalBody>{children}</CModalBody>
      </CModal>
    </>
  );
};
interface ICompilerModal {
  open: boolean;
  setOpen: any;
  children: ReactNode;
}
export default CompilerModal;
