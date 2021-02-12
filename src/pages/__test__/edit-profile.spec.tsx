import { render, waitFor, RenderResult } from "../../test-utils";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { EditProfile, EDIT_PROFILE_MUTATION } from "../user/edit-profile";
import userEvent from "@testing-library/user-event";

// useMe mocking
const mockMe = {
  data: {
    me: { id: 2, email: "asdf@asdf.com", role: "Host", __typename: "User" }
  }
};
jest.mock("../../hooks/useMe", () => {
  return {
    useMe: () => {
      return mockMe;
    }
  };
});

describe("<EditProfile />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <EditProfile />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    const { getByPlaceholderText, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => expect(document.title).toBe("Edit Profile | Podcast"));
    // expect(email).toBe(mockMe.data.me.email); // debug() 로도 defaultValue는 확인이 안됨
    // debug();
  });
  it("renders validation errors", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const button = getByRole("button");
    await waitFor(() => {
      // 여기에선 state가 바뀌는 것을 기다리기 위해 사용
      userEvent.click(email);
      userEvent.type(email, "wont@work");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);
  });
  it("submits mutation with form values", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole("button");
    const formData = {
      email: "working@email.com",
      password: "1234"
    };
    const mockedEditProfileMutationResponse = jest.fn().mockResolvedValue({
      data: {
        editProfile: {
          ok: true,
          error: null
        }
      }
    });
    // mutation
    mockedClient.setRequestHandler(
      EDIT_PROFILE_MUTATION,
      mockedEditProfileMutationResponse
    );
    await waitFor(() => {
      userEvent.clear(email);
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    // check request data (toHaveBeenCalledWith)
    expect(mockedEditProfileMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedEditProfileMutationResponse).toHaveBeenCalledWith({
      input: {
        email: formData.email,
        password: formData.password
      }
    });
  });

  afterAll(() => {
    jest.clearAllMocks(); // test 후 모든 것을 제자리로 돌려 놓음(hooks mock 이후)
  });
});
