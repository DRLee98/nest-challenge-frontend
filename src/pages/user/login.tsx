import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../../__generated__/loginMutation";
import { isLoggedInVar, authToken } from "../../apollo";
import { AccountButton } from "../../components/button";
import { EMAIL_REGEX, LOCALSTORAGE_TOKEN } from "../../constants";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const [move, setMove] = useState(true);
  setTimeout(() => setMove(false), 1000);
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({ mode: "onChange" }); // 나중에 handleSubmit 제외 하고 test 해보자
  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        // useMutation() hooks로 부터 얻은 mutation function, mutation을 실제로 서버로 전송
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login | Podcast</title>
      </Helmet>
      <div className="overflow-hidden mt-56 pt-10 flex flex-col justify-center items-center">
        <section
          className={`w-full max-w-screen-sm flex flex-col px-5 items-center  transition-transform duration-1000 ${
            move ? "transform translate-y-96" : ""
          }`}
        >
          <h1
            className={`rounded-md w-md p-2 font-medium text-center text-3xl mb-5 transition-color duration-500 ${
              formState.isValid && "bg-blue-400 text-white transform scale-125"
            }`}
          >
            Welcome Log in!
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 w-full max-w-md my-5"
          >
            <input
              ref={register({
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email",
                },
              })}
              className="input"
              placeholder="Email"
              type="email"
              name="email"
            />
            {errors.email?.message && (
              <FormError errorMessage={errors.email.message} />
            )}
            {errors.email?.type === "pattern" && (
              <FormError errorMessage="Please enter a valid email" />
            )}
            <input
              ref={register({ required: "Password is required" })}
              className="input"
              placeholder="Password"
              type="password"
              name="password"
            />
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
            <AccountButton
              canClick={formState.isValid}
              loading={loading}
              actionText="Log in"
            />
            {loginMutationResult?.login.error && (
              <FormError errorMessage={loginMutationResult.login.error} />
            )}
          </form>
          <div className="text-indigo-900 mt-4">
            New to Podcast?{" "}
            <Link
              to="/create-account"
              className="text-blue-400 hover:underline"
            >
              Create an Account
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
