import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AccountButton } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";
import { EMAIL_REGEX } from "../../constants";
import { FormError } from "../../components/form-error";
import React, { useState } from "react";

interface IFormProps {
  email?: string;
  password?: string;
}

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const [move, setMove] = useState(true);
  setTimeout(() => setMove(false), 1000);
  const { data: userData, refetch } = useMe();
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    errors,
  } = useForm<IFormProps>({
    defaultValues: {
      email: userData?.me.email,
    },
    mode: "onChange",
  });
  const client = useApolloClient();
  const onCompleted = async (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      //update cache
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
          },
        });
      }
      //   await refetch();
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const onSubmit = () => {
    // getValues 후 edit profile mutation을 call
    // 그리고 cache도 update : 나중에 다른 스크린에 필요할 수도 있으므로
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }), // 아무것도 입력안해서 password에 ""들어간 경우 password 항목자체가 없게 해서 ""으로 password가 변경되는 것을 막아줌
        },
      },
    });
  };
  return (
    <div>
      <Helmet>
        <title>Edit Profile | Podcast</title>
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
            Edit Profile
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 w-full max-w-md my-5"
          >
            <input
              ref={register({
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email",
                },
              })}
              name="email"
              className="input"
              type="email"
              placeholder="Email"
            />
            {errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            )}
            <input
              ref={register}
              name="password"
              className="input"
              type="password"
              placeholder="Password"
            />
            <AccountButton
              loading={loading}
              canClick={formState.isValid}
              actionText="Save Profile"
            />
          </form>
        </section>
      </div>
    </div>
  );
};
