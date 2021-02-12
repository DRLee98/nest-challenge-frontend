import { gql, useMutation, useQuery } from "@apollo/client";
import {
  toggleSubscribeMutation,
  toggleSubscribeMutationVariables,
} from "../__generated__/toggleSubscribeMutation";
import { ME_QUERY } from "./useMe";

export const TOGGLE_SUBSCRIBE_MUTATION = gql`
  mutation toggleSubscribeMutation($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      error
    }
  }
`;

export const ToggleSubscribe = () => {
  return useMutation<toggleSubscribeMutation, toggleSubscribeMutationVariables>(
    TOGGLE_SUBSCRIBE_MUTATION,
    {
      refetchQueries: [
        {
          query: ME_QUERY,
        },
      ],
    },
  );
};
