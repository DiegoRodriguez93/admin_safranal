import React from "react";
import Modal from "react-modal";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
/* import htmlToDraft from "html-to-draftjs"; */
import "./../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MDBCol, MDBRow } from "mdbreact";
import Swal from 'sweetalert2';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function TextEditor({ setIsOpenModal, editKeyt }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  React.useEffect(() => {
    setIsOpenModal && openModal();
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`<p>${editKeyt.value}</p>`)
        )
      )
    );
  }, [setIsOpenModal, editKeyt]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    document.body.style.overflowY = "hidden";
    document.querySelector('div[title="Superscript"]').style.display = 'none';
    document.querySelector('div[title="Subscript"]').style.display = 'none';
    document.querySelector('div[title="Embedded"]').style.display = 'none'; 
    document.querySelector('div[title="Emoji"]').style.display = 'none'; 
    document.querySelector('div[title="Image"]').style.display = 'none'; 
    document.querySelector('div[title="Remove"]').style.display = 'none'; 
    document.querySelector('div[title="Right"]').style.display = 'none'; 
    document.querySelector('div[title="Left"]').style.display = 'none'; 
    document.querySelector('div[title="Center"]').style.display = 'none'; 
    document.querySelector('div[title="Justify"]').style.display = 'none'; 
    document.getElementsByClassName("rdw-dropdown-wrapper")[0].style.display = 'none';
    document.getElementsByClassName("rdw-dropdown-wrapper")[1].style.display = 'none';
    document.getElementsByClassName("rdw-dropdown-wrapper")[2].style.display = 'none';
    document.getElementsByClassName("sidebar-fixed")[0].style.zIndex = 0;
  }

  function closeModal() {
    setIsOpen(false);
    document.body.style.overflowY = "scroll";
    document.getElementsByClassName("sidebar-fixed")[0].style.zIndex = 1050;
  }

  function editarHandler() {

      Swal.fire({
        title: 'Editando ...',
        onBeforeOpen () {
          Swal.showLoading ()
        },
        onAfterClose () {
          Swal.hideLoading()
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false
      });

      let value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      value = value.replaceAll('<p>', '');
      value = value.replaceAll('</p>', '<br>');
      if(value.slice(value.length - 5).search("<br>") != -1){
        value = value.slice(0, -5);
      }

      let formData = new FormData();
  
      formData.append("value", value);
      formData.append("id", editKeyt.id);
  
      fetch(editKeyt.url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((res) => {
          setTimeout(()=>{Swal.fire('Correcto!', 'Valor editado correctamente!', 'success');},300);
          closeModal();
          //window.refreshTextTable = Math.floor(Math.random() * 1000);
          setTimeout(()=>{window.location.reload();},2500);

        })
        .catch((error) => Swal.fire('Error!', 'Ha ocurrido un error, intente más tarde!', 'error'))
        ;
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={(editorState) => setEditorState(editorState)}
          />
          <MDBRow>
            <MDBCol lg="6" sm="6">
              <button onClick={closeModal} className="btn btn-block btn-danger">Cancelar</button>
            </MDBCol>
            <MDBCol lg="6" sm="6">
              <button onClick={editarHandler} className="btn btn-block btn-success">Editar</button>
            </MDBCol>
          </MDBRow>
        </div>
      </Modal>
    </React.Fragment>
  );
}
