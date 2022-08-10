import React, { useState, useRef, useContext, useEffect } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import UserContext from "../context/UserContext";
import { v4 } from "uuid";

const Input = () => {
  const { currentUser, posts, updatePosts } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const addNewPost = () => {
    var today = new Date();
    let newPost = {
      postID: v4(),
      contents: input,
      image: selectedFile,
      postAuthor: currentUser.username,
      createdOn:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      updatedOn:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
    };
    let newPosts = JSON.parse(JSON.stringify(posts));
    if (newPosts) {
      newPosts.unshift(newPost);
      localStorage.setItem("posts", JSON.stringify(newPosts));
      updatePosts(newPosts);
      setSelectedFile(null);
      setInput("");
      return alert("Your Tweet was sent.");
    } else {
      localStorage.setItem("posts", JSON.stringify([newPost]));
      updatePosts([newPost]);
      setSelectedFile(null);
      setInput("");
      return alert("Your Tweet was sent.");
    }
  };

  const addImageToPost = (e) => {
    const [file] = e.target.files;
    setSelectedFile(URL.createObjectURL(file));
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
    >
      <img
        src="https://cdn.discordapp.com/avatars/669518518777282561/98857e117ff28cde16f1a227c80dd272.webp?size=100"
        alt="profile pic"
        className="h-12 w-12 rounded-full xl:mr-2.5"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile & "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows="2"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
            {showEmojis && (
              <div
                style={{
                  position: "absolute",
                  marginTop: "465px",
                  marginLeft: -40,
                  maxWidth: "320px",
                  borderRadius: "20px",
                }}
              >
                <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
              </div>
            )}
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input.trim() && !selectedFile}
            onClick={addNewPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
