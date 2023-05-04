import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function SignupForm(props) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessages, setErrorMessages] = useState( {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    //유효성 검사
    const [isData, setIsData] = useState({
        username: false, //2자 이상 15자 이하
        email: false, //이메일 형식
        password: false, //영문+숫자+특수문자 8자이상 25자 이하
        confirmPassword: false, //비밀번호 일치
    });

    //비밀번호 일치 err
    // const [error, setError] = useState("");

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    const nameInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (event.target.value.length < 2 || event.target.value.length > 16) {
            setIsData((prevData) => ({ ...prevData, [name]: false }));
            setErrorMessages( (prevMessages) => ( {
                ...prevMessages,
                [name]: '이름은 2자 이상 15자 이하로 입력해주세요.',
            }));
        } else {
            setIsData((prevData) => ({ ...prevData, [name]: true }));
            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [name]: '',
            }));
        }
    };

    const mailInputChange = (event) => {
        const { name, value } = event.target;
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (!emailRegex.test(event.target.value)) {
            setIsData((prevData) => ({ ...prevData, [name]: false }));
            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [name]: "유효한 이메일 주소를 입력해주세요.",
              }));
        } else {
            setIsData((prevData) => ({ ...prevData, [name]: true }));
            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [name]: "",
              }));
        }
    };

    const pwdInputChange = (event) => {
        const { name, value } = event.target;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (!passwordRegex.test(event.target.value)) {
            setIsData((prevData) => ({ ...prevData, [name]: false }));
            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [name]:
                  "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 25자 이하로 입력해주세요.",
              }));
        } else {
            setIsData((prevData) => ({ ...prevData, [name]: true }));
            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [name]: "",
              }));
        }
    };

    const cfpwdInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (formData.password === event.target.value) {
            setIsData((prevData) => ({ ...prevData, [name]: true }));
            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [name]: "",
              }));
        } else {
            setIsData((prevData) => ({ ...prevData, [name]: false }));
            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [name]: "비밀번호가 일치하지 않습니다.",
              }));
        }
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // 회원가입 처리 로직
        axios.post("/api/user/register", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }).then(function (response) {
            console.log(response);
            const url = response.data;
            if (url.includes("/login")) {
                alert(formData.username + "님, 환영합니다!");
                window.location.href = "/login";
            } else if (url.includes("/duplicate")) {
                alert("이미 가입된 메일입니다.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("회원가입 오류");
        });

    };

    const showError = (name) => {
        if (errorMessages[name]) {
          return (
            <span className="text-red-500 text-sm">{errorMessages[name]}</span>
          );
        }
        return null;
      };

    const clearErrorMessage = (name) => {
        setErrorMessages((prevMessages) => ({
          ...prevMessages,
          [name]: '',
        }));
      };

    return (
        <Container fluid className="signup-header mx-md" class="flex flex-col items-center justify-center px-2 py-2 ">
            <Container fluid className="signup-header mx-md" class="flex flex-col items-center justify-center px-2 py-2 " style={{ maxWidth: "830px" }}>
                <form onSubmit={handleSubmit}>
                    <div class="p-20 px-10 space-y-4 md:space-y-6 sm:p-8" style={{ alignItems: "center" }}>
                        <div class="w-auto md:w-auto isolate px-36 py-2 sm:py-32 lg:px-8">
                            <div class="mx-auto max-w-2xl text-center">
                                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">회원가입</h2>
                                <p class="mt-2 text-lg leading-8 text-gray-600">KaKaQ에 가입하여 여러 편리한 설문조사 기능을 이용해보세요.</p>
                            </div>
                            <br />
                            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div class="sm:col-span-2">
                                    <div class="flex flex-col sm:flex-row items-center">
                                        <label for="username" class="block text-sm font-semibold leading-6 text-gray-900 sm:w-1/4 mb-2 sm:mb-0 sm:mr-4 sm:text-right">사용자 이름</label>
                                        <div class="flex-1">
                                            <input type="text"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={nameInputChange}
                                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="username"
                                                required />{errorMessages.username && <div style={{ fontSize: "11px", color: "red" }}>{errorMessages.username}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div class="sm:col-span-2">
                                    <div class="flex flex-col sm:flex-row items-center">
                                        <label for="company" class="block text-sm font-semibold leading-6 text-gray-900 sm:w-1/4 mb-2 sm:mb-0 sm:mr-4 sm:text-right">이메일</label>
                                        <div class="flex-1">
                                            <input type="text"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={mailInputChange}
                                                class="block leading-3 w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="email" required />
                                                {errorMessages.email && <div style={{ fontSize: "11px", color: "red" }}>{errorMessages.email}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div class="sm:col-span-2">
                                    <div class="flex flex-col sm:flex-row items-center">
                                        <label for="company" class="block text-sm font-semibold leading-6 text-gray-900 sm:w-1/4 mb-2 sm:mb-0 sm:mr-4 sm:text-right">비밀번호</label>
                                        <div class="flex-1">
                                            <input type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={pwdInputChange}
                                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="password" required />  {errorMessages.password && <div style={{ fontSize: "11px", color: "red" }}>{errorMessages.password}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div class="sm:col-span-2">
                                    <div class="flex flex-col sm:flex-row items-center">
                                        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900 sm:w-1/4 mb-2 sm:mb-0 sm:mr-4 sm:text-right">비밀번호 확인</label>
                                        <div class="flex-1">
                                            <input type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={cfpwdInputChange}
                                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="comfirm password" required />
                                                 {errorMessages.confirmPassword && <div style={{ fontSize: "11px", color: "red" }}>{errorMessages.confirmPassword}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-x-4 sm:col-span-2">
                                    <div class="flex h-6 items-center">
                                        <button type="submit"
                                            disabled={!(isData.username && isData.email && isData.password && isData.confirmPassword)}
                                            class="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" role="switch" aria-checked="false" aria-labelledby="switch-1-label">
                                            <span class="sr-only">Agree to policies</span>

                                            <span aria-hidden="true" class="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
                                        </button>
                                    </div>
                                    <label class="text-sm leading-6 text-gray-600" id="switch-1-label">
                                        By selecting this, you agree to our&nbsp;
                                        <a href="#" class="font-semibold text-indigo-600">privacy policy</a>.
                                    </label>
                                </div>
                            </div>
                            <div class="mt-10">
                                <button
                                    type="submit"
                                    className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${!(isData.username && isData.email && isData.password && isData.confirmPassword) ? 'disabled' : ''}`}
                                    disabled={!isData.username || !isData.email || !isData.password || !isData.confirmPassword}
                                    style={{ backgroundColor: !(isData.username && isData.email && isData.password && isData.confirmPassword) ? '#ccc' : '' }}
                                >
                                    회원가입
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <br />
            </Container>
        </Container>
    );
}

function Signup() {
    return (
        <div>
            <SignupForm title="회원가입" />
        </div>
    );
}

export default Signup;
