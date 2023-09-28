// import React, { useState } from "react";
// import styles from "./Texts.module.css";
// import { doc, deleteDoc, updateDoc } from "firebase/firestore";
// import db from "../../api/firebase";
// import { useDispatch, useSelector } from "react-redux/es/exports";
// import { RootState, changeData } from "../../utils/Store";
// interface TextsProps {
//   textObj: {
//     id: string;
//     text: string;
//   };
//   isOwner: boolean;
// }

// export default function Texts({ textObj, isOwner }: TextsProps): React.ReactElement {
//   const user = useSelector((state: RootState) => state.user);

//   const [editing, setEditing] = useState(false);
//   const [newText, setNewText] = useState(textObj.text);

//   let dispatch = useDispatch();

//   const onDeleteClick = () => {
//     const ok = window.confirm("정말 삭제하실꺼죠?");

//     if (ok) {
//       //서버에서 데이터 삭제하기
//       deleteDoc(doc(db, "details", `${textObj.id}`));
//     }
//   };

//   const toggleEditing = () => {
//     setEditing((prev) => !prev);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //수정값을 서버로 보냄
//     const updateRef = doc(db, "details", `${textObj.id}`);
//     updateDoc(updateRef, {
//       text: newText,
//     });
//     setEditing(false);
//   };

//   const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNewText(e.target.value);
//   };

//   const dragStart = (e: React.DragEvent<Element>) => {
//     const target = e.target as HTMLElement;
//     dispatch(changeData(target.id));
//   };
//   return (
//     <>
//       {user && (
//         <div className={styles.textList}>
//           {editing ? (
//             <>
//               <form onSubmit={onSubmit} className={styles.form}>
//                 <textarea placeholder="수정하세요" value={newText} required onChange={onChange} className={styles.textContents} wrap="on" />

//                 <input type="submit" value="확인" className={styles.ok} />
//                 <button onClick={toggleEditing} className={styles.cancel}>
//                   취소
//                 </button>
//               </form>
//             </>
//           ) : (
//             <>
//               <pre className={styles.textArea} draggable="true" onDragStart={dragStart} id={textObj.id}>
//                 {textObj.text}
//               </pre>
//               {isOwner && (
//                 <>
//                   <button onClick={toggleEditing} className={styles.fix}>
//                     수정
//                   </button>
//                   <button onClick={onDeleteClick} className={styles.delete}>
//                     삭제
//                   </button>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// }
