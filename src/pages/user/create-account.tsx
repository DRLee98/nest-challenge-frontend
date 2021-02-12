import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/form-error";
import { AccountButton } from "../../components/button";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../../__generated__/createAccountMutation";
import { EMAIL_REGEX } from "../../constants";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccount: CreateAccountInput!) {
    createAccount(input: $createAccount) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  password2: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const [move, setMove] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  setTimeout(() => setMove(false), 1000);
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Listener,
    },
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      setMove(ok);
      alert("Account Created! Log in now!");
      setTimeout(() => history.push("/login"), 1000);
    }
  };

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted },
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, password2, role } = getValues();
      if (password !== password2) {
        setErrorMsg("Passwords do not match each other.");
      }
      createAccountMutation({
        variables: {
          createAccount: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>CreateAccount | Podcast</title>
      </Helmet>
      <div className="overflow-hidden mt-56 pt-10 flex flex-col justify-center items-center">
        <section
          className={`w-full max-w-screen-sm flex flex-col px-5 items-center transition-all duration-1000 ${
            move && "transform translate-y-96"
          }`}
        >
          <h4
            className={`rounded-md w-md p-2 font-medium text-center text-3xl mb-5 transition-color duration-500 ${
              formState.isValid && "bg-blue-400 text-white transform scale-125"
            }`}
          >
            Let's get started
          </h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 w-full max-w-md mb-5"
          >
            <input
              ref={register({
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email",
                },
              })}
              required
              name="email"
              placeholder="Email"
              className="input"
            />
            {errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            )}
            {errors.email?.type === "pattern" && (
              <FormError errorMessage="Please enter a valid email" />
            )}
            <input
              ref={register({ required: "Password is required" })}
              required
              name="password"
              type="password"
              placeholder="Password"
              className="input"
            />
            <input
              ref={register({ required: "Please check your password" })}
              required
              name="password2"
              type="password"
              placeholder="Verify your password"
              className="input"
            />
            {errors.password?.message && setErrorMsg(errors.password?.message)}
            {errors.password2?.message &&
              setErrorMsg(errors.password2?.message)}
            {errorMsg && <FormError errorMessage={errorMsg} />}
            <select
              name="role"
              ref={register({ required: true })}
              className="input mb-1"
            >
              {Object.keys(UserRole).map((role, index) => (
                <option key={index} className="input">
                  {role}
                </option>
              ))}
            </select>
            <AccountButton
              canClick={formState.isValid}
              loading={loading}
              actionText="Create Account"
            />
            {createAccountMutationResult?.createAccount.error && (
              <FormError
                errorMessage={createAccountMutationResult.createAccount.error}
              />
            )}
          </form>
          <div className="text-indigo-900">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log in now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
