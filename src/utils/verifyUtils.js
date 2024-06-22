const regex_password = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=])[a-zA-Z0-9!@#$%^&*()_+-=]{8,12}$/;
const regex_nickName = /^[\w가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*()+=\-_\s]{2,12}$/;
const regex_loginId = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/;
const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default {
    comment: (isLogin, loginId, password, content) => {
        if (!isLogin) {
            if (!loginId) {
                alert('아이디를 입력해주세요.')
                return false
            } else if (!password) {
                alert('비밀번호를 입력해주세요.')
                return false
            }
        }
        if (!content) {
            alert('내용을 입력해주세요.')
            return false
        }
        return true
    },
    comment2: (isLogin, content) => {
        if (!isLogin) {
            alert('로그인 유저만 가능합니다.')
            return false
        } if (!content) {
            alert('내용을 입력해주세요.')
            return false
        }
        return true
    },
    enrollBoard(id, password, type, title, content) {
        if (!id) {
            alert('아이디를 입력해주세요.')
            return false
        } else if (!password) {
            alert('비밀번호를 입력해주세요.')
            return false
        } else if (type == undefined) {
            alert('카테고리를 입력해주세요.')
            return false
        } else if (!title || title.length < 2) {
            alert('제목를 2자 이상 입력해주세요.')
            return false
        }  else if (!content) {
            alert('내용을 입력해주세요.')
            return false
        }

        return true
    },
    enrollTrial(title, plaintiff, defendant, subheading, plaintiffOpinion, defendantOpinion, content, agree) {
        if (!title || title.length < 2) {
            alert('제목를 2자 이상 입력해주세요.')
            return false
        } else if (!plaintiff || !defendant) {
            alert('원고명 또는 피고명을 입력해주세요.')
            return false
        } else if (!subheading) {
            alert('소제목을 입력해주세요.')
            return false
        } else if (!plaintiffOpinion || !defendantOpinion) {
            alert('의견A 또는 의견B를 입력해주세요.')
            return false
        } else if (!content) {
            alert('내용을 입력해주세요.')
            return false
        } else if (!agree) {
            alert('트라이얼 약관에 동의해주세요.')
            return false
        }

        return true
    },
    password(password) {
        if (!password) {
            alert('패스워드를 입력해주세요.')
            return false
        }
        return true
    },
    password2(password, rePassword) {
        if (!regex_password.test(password)) {
            alert('비밀번호를 형식에 맞게 해주세요.')
            return false
        } else if (password != rePassword) {
            alert('비밀번호가 일치하지 않습니다.')
            return false;
        }

        return true
    },
    editBoard(title, content) {
        if (!title || title.length < 2) {
            alert('제목를 2자 이상 입력해주세요.')
            return false
        }  else if (!content) {
            alert('내용을 입력해주세요.')
            return false
        }

        return true
    },
    modifyUser(newPassword, reNewPassword, nickName, email) {
        if (newPassword || reNewPassword) {
            if (!regex_password.test(newPassword)) {
                alert('비밀번호를 형식에 맞게 해주세요.')
                return false
            } else if (newPassword != reNewPassword) {
                alert('비밀번호가 일치하지 않습니다.')
                return false;
            }
        }

        if (!regex_nickName.test(nickName)) {
            alert('닉네임을 입력해주세요.')
            return false;
        }

        if (!regex_email.test(email)) {
            alert('이메일을 알맞게 입력해주세요.')
            return false;
        }

        return true
    },
    message(title, content) {
        if (!title) {
            alert('제목을 입력해주세요.')
            return false;
        } else if (!content) {
            alert('내용을 입력해주세요.')
            return false;
        }

        return true;
    },
    message2(receiver, title, content) {
        if (!receiver) {
            alert('수신자를 입력해주세요.')
            return false;
        } else if (!title) {
            alert('제목을 입력해주세요.')
            return false;
        } else if (!content) {
            alert('내용을 입력해주세요.')
            return false;
        }

        return true;
    },
    id(id) {
        if (!regex_loginId.test(id)) {
            alert("유효하지 않은 로그인 아이디 형식입니다.");
            return false
        }
        return  true
    },
    email(email) {
        if (!regex_email.test(email)) {
            alert("유효하지 않은 이메일 형식입니다.");
            return false
        }
        return true
    },
    emailCode(code) {
        if (!code) {
            alert('인증번호를 입력해주세요.')
            return false;
        }
        return true
    },
    nickName(nickName) {
        if (!regex_nickName.test(nickName)) {
            alert('유효하지 않는 닉네임 형식입니다.')
            return false;
        }
        return true
    },
    register(confirmId, confirmNickname, password, rePassword, nickName) {
        if (!confirmId) {
            alert('아이디 중복확인을 해주세요.')
            return false;
        } else if(!confirmNickname) {
            alert('닉네임 중복확인을 해주세요.')
            return false;
        } else if (!regex_password.test(password)) {
            alert('비밀번호를 형식에 맞게 해주세요.')
            return false
        } else if (password != rePassword) {
            alert('비밀번호가 일치하지 않습니다.')
            return false;
        } else if (!regex_nickName.test(nickName)) {
            alert('닉네임을 입력해주세요.')
            return false;
        }
        return true
    },
    login(loginId, password) {
        if (!loginId) {
            alert('아이디를 입력해주세요')
            return false
        } else if (!password) {
            alert('비밀번호를 입력해주세요')
            return false
        }
        return true
    }
}
