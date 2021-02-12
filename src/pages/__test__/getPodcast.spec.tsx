import { render, waitFor, RenderResult } from "../../test-utils";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { GetPodcast, PODCAST_QUERY } from "../listener/getPodcast";

const mockedPodcastQueryResponse = Promise.resolve({
  data: {
    getPodcast: {
      ok: true,
      error: null,
      podcast: {
        id: 3,
        title: "test1",
        thumbnailImg:
          "https://www.iclr.co.uk/wp-content/uploads/media//2019/08/Podcast-825x420.jpg",
        creator: {
          id: 2,
          email: "asdf@asdf.com",
          nickName: "Tony",
          role: "Host",
          __typename: "User",
        },
        description: "test description",
        category: "education",
        episodes: [
          {
            id: 6,
            createdAt: "2021-02-02T12:57:07.106Z",
            title: "test epi1",
            description: "enjoy this episode2",
            fileURL:
              "https://wetubetony.s3.ap-northeast-2.amazonaws.com/audio/JORM+-+BROKEN+(FREE+MUSIC+FOR+VLOGS).MP3",
            __typename: "Episode",
          },
          {
            id: 4,
            createdAt: "2021-02-01T14:45:35.921Z",
            title: "test epi0",
            description: "enjoy this episode3",
            fileURL:
              "https://wetubetony.s3.ap-northeast-2.amazonaws.com/audio/JORM+-+BROKEN+(FREE+MUSIC+FOR+VLOGS).MP3",
            __typename: "Episode",
          },
        ],
        __typename: "Podcast",
      },
      __typename: "PodcastOutput",
    },
  },
});

describe("<GetPodcast />", () => {
  // get the podcasts(mocking) and render
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  it("renders OK without data", async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <GetPodcast />
        </ApolloProvider>,
      );
    });
    // login ? not required
    // data required ? not required
    const { debug } = renderResult;
    await waitFor(() => expect(document.title).toBe("Podcast | Podcast"));
    // debug();
  });

  it("renders with data", async () => {
    mockedClient = createMockClient();
    mockedClient.setRequestHandler(
      PODCAST_QUERY,
      () => mockedPodcastQueryResponse,
    );

    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <GetPodcast />
        </ApolloProvider>,
      );
    });
    const { debug, getByText } = renderResult;
    // debug();
    getByText("test1");
  });
});
