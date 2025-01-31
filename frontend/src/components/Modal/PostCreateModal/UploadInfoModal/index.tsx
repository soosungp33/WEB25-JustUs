/*global kakao*/
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";

import ModalSub from "./ModalSub";

interface FileObject {
  file: File;
  key: string;
}
interface IData {
  [key: string]: string;
}
interface UploadInfoModalProps {
  changeMode: () => void;
  files: FileObject[];
}

const UploadInfoModal = ({ changeMode, files }: UploadInfoModalProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [activate, setActivate] = useState<boolean>(false);
  const [isSubOpened, setIsSubOpened] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<IData>({});
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const highlightsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handelTitleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    setTitle(value);
  };

  const handelTextInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    const highlightedText = applyHighlights(value);

    setText(value);
    highlightsRef.current.innerHTML = highlightedText;
  };

  const applyHighlights = (textParam: string) => {
    const highlightedText = textParam.replace(/\n$/g, "\n\n").replace(/#([\w|ㄱ-ㅎ|가-힣]+)/g, "<mark>$&</mark>");
    return highlightedText;
  };

  const handleScroll = () => {
    const scrollTop = inputRef.current?.scrollTop as number;

    if (!backdropRef.current) return;
    highlightsRef.current.scrollTop = scrollTop;
  };

  const onClickLocationBtn = () => {
    setIsSubOpened(true);
  };

  useEffect(() => {
    if (title.length == 0) setActivate(false);
    else setActivate(true);
  }, [title]);

  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
      isSubOpened={isSubOpened}
    >
      <ModalMain>
        <ModalHeader>
          <ModalTitle>새 게시물 만들기</ModalTitle>
          <ModalHeaderRigthBtn onClick={closeModal}>
            <img src="/icons/x.svg" alt="close" height="90%"></img>
          </ModalHeaderRigthBtn>
          <ModalHeaderLeftBtn onClick={changeMode}>
            <img src="/icons/prev.svg" alt="prev modal" height="90%"></img>
          </ModalHeaderLeftBtn>
        </ModalHeader>
        <ModalContent>
          <ModalLeft>
            <Carousel files={files} carouselWidth={250} />
          </ModalLeft>
          <ModalRight>
            <InputTitle type="text" placeholder="제목" value={title} onChange={handelTitleInput} />
            <div className="backdrop" ref={backdropRef}>
              <div ref={highlightsRef} className="highlights"></div>
            </div>
            <InputText
              ref={inputRef}
              placeholder="내용"
              value={text}
              onChange={handelTextInput}
              onScroll={handleScroll}
            />
            <InputBottom>
              <InputDate type="date" />
              <InputPlace>
                <InputPlaceName>
                  {Object.keys(selectedLocation).length === 0 ? "장소를 선택하세요." : selectedLocation.place_name}
                </InputPlaceName>
                <LocationButton onClick={onClickLocationBtn}>
                  <img src="/icons/location.svg" width="100%" />
                </LocationButton>
              </InputPlace>
            </InputBottom>
            <UploadButton activate={activate}>게시하기</UploadButton>
          </ModalRight>
        </ModalContent>
      </ModalMain>

      {isSubOpened && (
        <ModalSub
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setIsSubOpened={setIsSubOpened}
          setSelectedLocation={setSelectedLocation}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          page={page}
          setPage={setPage}
          lastPage={lastPage}
          setLastPage={setLastPage}
        />
      )}
    </ModalContainer>
  );
};

const UploadButton = styled.button<{ activate: boolean }>`
  background-color: ${(props) => {
    if (props.activate) return props.theme.PRIMARY;
    else return props.theme.SECONDARY;
  }};
  border: 1px solid ${(props) => props.theme.PRIMARY};
  border-radius: 10px;
  flex-basis: 3rem;
  margin-top: 1rem;
  color: ${COLOR.WHITE};
  font-size: 1rem;
  cursor: ${(props) => {
    if (props.activate) return "pointer";
    else return "not-allowed";
  }};
  z-index: 3;
  position: relative;
  top: -200px;
`;
const LocationButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
const InputPlaceName = styled.div`
  border: 1px solid black;
  height: 4vh;
  line-height: 4vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  margin-right: 30px;
  flex-basis: 90%;
  text-align: right;
  color: ${COLOR.DARKGRAY};
`;
const InputBottom = styled.div`
  position: relative;
  top: -200px;
  display: flex;
  flex-direction: column;
  max-height: 5rem;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid ${COLOR.LIGHTGRAY1};
  padding-right: 2rem;
`;
const InputPlace = styled.div`
  display: flex;
  width: 100%;
  z-index: 3;
`;
const InputDate = styled.input`
  flex-basis: 20vh;
  border: none;
  font-size: 1rem;
  padding-right: 5px;
  z-index: 3;
`;
const InputTitle = styled.input`
  flex-basis: 5vh;
  margin-bottom: 2vh;
  border: none;
  border-bottom: 1px solid ${COLOR.LIGHTGRAY1};
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;
const InputText = styled.textarea`
  position: relative;
  top: -200px;
  font-size: 1.2rem;
  border: none;
  resize: none;
  margin-bottom: 2vh;
  z-index: 2;
  overflow: auto;
  width: 400px;
  height: 200px;
  background-color: transparent;
  margin: 0;
  padding: 0;
  line-height: 1rem;

  &:focus {
    outline: none;
  }
`;
const ModalRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh;
  padding-top: 2vh;
  height: 100%;

  & > .backdrop {
    z-index: 1;
    background-color: ${COLOR.WHITE};
    pointer-events: none;
    font-size: 1.2rem;
    line-height: 1rem;
    pointer-events: none;
    width: 400px;
    height: 200px;

    & mark {
      border-radius: 3px;
      color: transparent;
      background-color: ${COLOR.THEME1.SECONDARY};
      letter-spacing: normal;
      font-size: 1.2rem;
      width: 400px;
      height: 200px;
      overflow: auto;
    }

    & > .highlights {
      white-space: pre-wrap;
      word-wrap: break-word;
      color: transparent;
      font-size: 1.2rem;
      resize: none;
      width: 400px;
      height: 200px;
      overflow: auto;
    }
  }
`;
const ModalLeft = styled.div`
  width: 100%;
  height: 45vh;
`;
const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  box-sizing: border-box;
`;
const ModalContainer = styled.div<{ isSubOpened: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${COLOR.WHITE};
  width: ${(props) => (props.isSubOpened ? "1000px" : "850px")};
  height: 530px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;
const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModalHeaderLeftBtn = styled.button`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  border: none;
  background: none;
  cursor: pointer;
`;
const ModalHeaderRigthBtn = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border: none;
  background: none;
  cursor: pointer;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${COLOR.BLACK};
  font-size: max(1.2vw, 20px);
`;
const ModalTitle = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default UploadInfoModal;
