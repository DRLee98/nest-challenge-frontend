import { render, waitFor, RenderResult } from "../../test-utils";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { GetAllPodcasts, PODCASTS_QUERY } from "../listener/getAllPodcasts";
import userEvent from "@testing-library/user-event";

const mockedPodcastsQueryResponse = Promise.resolve({
  data: {
    getAllPodcasts: {
      ok: true,
      error: null,
      podcasts: [
        {
          id: 5,
          title: "test3",
          thumbnailImg:
            "https://www.iclr.co.uk/wp-content/uploads/media//2019/08/Podcast-825x420.jpg",
          description: "test description",
          category: "education",
          episodes: [],
          __typename: "Podcast",
        },
        {
          id: 2,
          title: "testPodcast",
          thumbnailImg:
            "https://www.iclr.co.uk/wp-content/uploads/media//2019/08/Podcast-825x420.jpg",
          description: "test description",
          category: "education",
          episodes: [
            {
              id: 2,
              createdAt: "2021-02-01T12:13:18.941Z",
              title: "test epi2",
              description: "enjoy this episode2",
              fileURL:
                "https://wetubetony.s3.ap-northeast-2.amazonaws.com/audio/JORM+-+BROKEN+(FREE+MUSIC+FOR+VLOGS).MP3",
              __typename: "Episode",
            },
            {
              id: 1,
              createdAt: "2021-02-01T12:05:56.115Z",
              title: "test epi",
              description: "enjoy this episode",
              fileURL:
                "https://wetubetony.s3.ap-northeast-2.amazonaws.com/audio/JORM+-+BROKEN+(FREE+MUSIC+FOR+VLOGS).MP3",
              __typename: "Episode",
            },
          ],
          __typename: "Podcast",
        },
      ],
      __typename: "GetAllPodcastsOutput",
    },
  },
});

const mockPush = jest.fn();
jest.mock("react-router-dom", () => {
  // jest가 module을 전부 cover하면서 beforeEach에서 쓰고 있는 Router까지 고장남
  const realModule = jest.requireActual("react-router-dom"); // 실제 모듈을 필요로 함
  return {
    ...realModule, // 실제 모듈 기능 + mock이 필요한 부분만 mock
    useHistory: () => {
      return { push: mockPush };
    },
  };
});

describe("<GetAllPodcasts />", () => {
  // get the podcasts(mocking) and render
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  it("renders OK without data", async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <GetAllPodcasts />
        </ApolloProvider>,
      );
    });
    // login ? not required
    // data required ? not required
    const { debug } = renderResult;
    await waitFor(() => expect(document.title).toBe("Home | Podcast"));
    // debug();
  });

  it("renders with data", async () => {
    mockedClient = createMockClient();
    mockedClient.setRequestHandler(
      PODCASTS_QUERY,
      () => mockedPodcastsQueryResponse,
    );

    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <GetAllPodcasts />
        </ApolloProvider>,
      );
    });
    const { debug, getByText, getByRole } = renderResult;
    // debug();
    getByText("testPodcast");
    // const aPodcast = getByRole('link');
    // userEvent.click(aPodcast);
    // expect(mockPush).toHaveBeenCalledWith('/podcast/5');
  });

  afterAll(() => {
    jest.clearAllMocks(); // test 후 모든 것을 제자리로 돌려 놓음(hooks mock 이후)
  });
});
