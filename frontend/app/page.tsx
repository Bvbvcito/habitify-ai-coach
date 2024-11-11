"use client";
import ModalWindow from "@/components/ModalWindow";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [modal, setModal] = useState(false);

  return (
    <>
      {
        <ModalWindow
          onClose={() => setModal(false)}
          show={modal}
          edit_method="Add"
        />
      }
      <div className="container bg-gray-200 mx-auto h-full min-h-screen items-center justify-center flex">
        <div>
          <button
            onClick={() => setModal(true)}
            className="bg-orange-500 text-white rounded-full p-2"
          >
            Set Modal
          </button>
          <span className="text-gray-500">
            {modal ? "La modal est ouverte" : "La modal est fermée"}
          </span>
        </div>
      </div>
    </>
  );
}
