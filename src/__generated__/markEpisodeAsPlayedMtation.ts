/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkEpisodeAsPlayedInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: markEpisodeAsPlayedMtation
// ====================================================

export interface markEpisodeAsPlayedMtation_markEpisodeAsPlayed {
  __typename: "MarkEpisodeAsPlayedOutput";
  ok: boolean;
  error: string | null;
}

export interface markEpisodeAsPlayedMtation {
  markEpisodeAsPlayed: markEpisodeAsPlayedMtation_markEpisodeAsPlayed;
}

export interface markEpisodeAsPlayedMtationVariables {
  input: MarkEpisodeAsPlayedInput;
}
