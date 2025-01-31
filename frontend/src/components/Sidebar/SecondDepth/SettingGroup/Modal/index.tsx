import { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flexRowCenterAlign, yesNoButtonWrapper } from "@src/styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "@styles/Color";
import { GroupAction } from "@src/action";
import { RootState } from "@src/reducer";

interface SettingGroupModalProps {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const groupMemberList = [
  {
    userID: 0,
    userNickname: "그 김영한 아님",
  },
  {
    userID: 1,
    userNickname: "집사",
  },
  {
    userID: 2,
    userNickname: "GPS",
  },
  {
    userID: 3,
    userNickname: "맹",
  },
  {
    userID: 4,
    userNickname: "테스트 유저1",
  },
  {
    userID: 5,
    userNickname: "테스트 유저2",
  },
  {
    userID: 6,
    userNickname: "테스트 유저3",
  },
];

const SettingGroupModal = ({ setIsToggle }: SettingGroupModalProps) => {
  const [clickedDropBtn, setClickedDropclickedDropBtn] = useState(false);
  const { selectedGroup, groups }: any = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickDropBtn = () => {
    setClickedDropclickedDropBtn(true);
  };
  const onClickConfirmBtn = () => {
    dispatch({ type: GroupAction.DELETE_GROUP, payload: selectedGroup });
    dispatch({ type: GroupAction.SET_SELECTED_GROUP, payload: null });
    closeModal();
    setIsToggle(false);
  };

  const onClickCancelBtn = () => {
    setClickedDropclickedDropBtn(false);
  };

  return (
    <Modal>
      <ModalContainer
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Title>그룹 설정</Title>
          <Content>
            <JoinCodeWrapper>
              <JoinCodeGuide>초대 코드</JoinCodeGuide>
              <JoinCode>D3WFq2GL1</JoinCode>
            </JoinCodeWrapper>
            <GroupMemberListWrapper>
              <GroupMemberListGuide>그룹원</GroupMemberListGuide>
              <GroupMemberList>
                {groupMemberList.map(groupMember => (
                  <GroupMember key={groupMember.userID}>
                    <img src="/icons/person.svg" alt="person icon" />
                    {groupMember.userNickname}
                  </GroupMember>
                ))}
              </GroupMemberList>
            </GroupMemberListWrapper>
            <GroupDropWrapper>
              <DropGuideWrapper>그룹 탈퇴</DropGuideWrapper>
              {!clickedDropBtn && <DropGroupButtonWrapper onClick={onClickDropBtn}>탈퇴하기</DropGroupButtonWrapper>}
              {clickedDropBtn && (
                <>
                  <YesButtonWrapper onClick={onClickConfirmBtn}>예</YesButtonWrapper>
                  <NoButtonWrapper onClick={onClickCancelBtn}>아니오</NoButtonWrapper>
                </>
              )}
            </GroupDropWrapper>
          </Content>
        </Header>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 30vw;
  min-width: 40vw;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 40px;
`;

const CloseBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;

  & > button {
    background-color: ${COLOR.WHITE};
    border: none;
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
`;

const JoinCodeWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
`;

const JoinCodeGuide = styled.div`
  width: 25%;
`;

const JoinCode = styled.div`
  font-size: 18px;
  margin-left: 30px;
`;

const GroupMemberListWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  height: 300px;
  overflow-y: auto;
`;

const GroupMemberListGuide = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const GroupMemberList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const GroupMember = styled.div``;

const GroupDropWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;

  & > .guide {
    font-size: 20px;
  }
`;

const DropGuideWrapper = styled.div`
  padding-top: 10px;
  width: 25%;
`;

const DropGroupButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${COLOR.RED};
  margin-left: 30px;
  cursor: pointer;
`;

const YesButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  ${yesNoButtonWrapper}
  border: 2px solid ${COLOR.RED};
`;

const NoButtonWrapper = styled.div`
  ${flexRowCenterAlign}
  ${yesNoButtonWrapper}
  border: 2px solid ${COLOR.BLUE};
`;

export default SettingGroupModal;
