const VIDEO_IDS = [
  "pBK2rfZt32g",
  "dQw4w9WgXcQ",
  "M7FIvfx5J10",
  "1Yfnfp5Ka1M","H_sc2au3poc","vmuUyzIc8zo","xvr2xpBJayc","7vOFxP-FFio","jqAo1XtU1Ko","y_Np8o5wHg0","wfeUJBdTeCo","I3BcCNby_LU","EucLUxbkJ4Y","xBzPioph8CI","ANMrzw7JFzA","1Cm1r3d2Qw4"
];

export async function onRequestGet() {
  const content = await Promise.all(
    VIDEO_IDS.map(async (videoId) => {
      try {
        const url =
          "https://www.youtube.com/oembed?url=" +
          encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`) +
          "&format=json";

        const res = await fetch(url);

        if (!res.ok) {
          return {
          dislikes: -1,
          time_created: 0,
          likes: -1,
          duration: null,
          displayable_view_count: 1,
          category: null,
          view_count: 1,
          user_id: null,
          author: data.author_name,
          restricted: 1,
          hide_view_count: false,
          length_seconds: null,
          published_localized: null,
          updated: null,
          description: "not ok",
          price: null,
          expires: "December 31, 9999",
          video_id: videoId,
          racy: false,
          image_url: "./broken.png",
          published: null,
          title: "Not OK."
        };;
        }

        const data = await res.json();

        return {
          dislikes: -1,
          time_created: 0,
          likes: -1,
          duration: null,
          displayable_view_count: 1,
          category: null,
          view_count: 1,
          user_id: null,
          author: data.author_name,
          restricted: 0,
          hide_view_count: false,
          length_seconds: null,
          published_localized: null,
          updated: null,
          description: data.title,
          price: null,
          expires: "December 31, 9999",
          video_id: videoId,
          racy: false,
          image_url: data.thumbnail_url,
          published: null,
          title: data.title
        };
      } catch {
        return {
          video_id: videoId,
          title: "Failed to fetch metadata",
          image_url: "https://s.ytimg.com/yts/img/syn/xl-button-vflZelva7.png",
          published: null,
          description: null
        };
      }
    })
  );

  return Response.json({
    content,
    start: 1,
    pretotal: VIDEO_IDS.length,
    total: content.length,
    return: 0
  });
}
