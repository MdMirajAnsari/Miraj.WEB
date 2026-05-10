import { useEffect, useMemo, useState } from 'react';
import { styles } from '../styles';

const storageKey = 'miraj-youtube-video-state';

const playlists = {
  'mern-project': {
    title: 'MERN Project Series',
    description: 'Build a MERN project step by step from the same playlist.',
    url: 'https://www.youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm',
  },
};

const videos = [
  {
    id: 1,
    embedId: 'lFeYU31TnQ8',
    title: 'Tech Reference Video',
    url: 'https://www.youtube.com/watch?v=lFeYU31TnQ8',
    category: 'tech',
  },
  {
    id: 2,
    embedId: 'F2FmTdLtb_4',
    title: 'Interview Preparation Video',
    url: 'https://www.youtube.com/watch?v=F2FmTdLtb_4',
    category: 'interview',
  },
  {
    id: 3,
    embedId: 'CuQmQpvw04I',
    title: 'Fun Video 1',
    url: 'https://www.youtube.com/watch?v=CuQmQpvw04I',
    category: 'fun',
  },
  {
    id: 4,
    embedId: 'X48VuDVv0do',
    title: 'Coding Practice Video',
    url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
    category: 'coding',
  },
  {
    id: 5,
    embedId: 'Rgx8dpiPwpA',
    title: 'Fun Video 2',
    url: 'https://www.youtube.com/watch?v=Rgx8dpiPwpA',
    category: 'fun',
  },
  {
    id: 6,
    embedId: '5bId3N7QZec',
    title: 'Fun Video 3',
    url: 'https://www.youtube.com/watch?v=5bId3N7QZec',
    category: 'fun',
  },
  {
    id: 7,
    embedId: 'ebniIyejb1E',
    title: 'Angular Interview Prep 1',
    url: 'https://www.youtube.com/watch?v=ebniIyejb1E&t=18s',
    category: 'angular interview',
  },
  {
    id: 8,
    embedId: 'uUnx3M1_uAg',
    title: 'Angular Interview Prep 2',
    url: 'https://www.youtube.com/watch?v=uUnx3M1_uAg',
    category: 'angular interview',
  },
  {
    id: 9,
    embedId: '_gfmaVcMFLk',
    title: 'Angular Interview Prep 3',
    url: 'https://www.youtube.com/watch?v=_gfmaVcMFLk',
    category: 'angular interview',
  },
  {
    id: 10,
    embedId: 'w2Mvky1rio8',
    title: 'Angular Interview Prep 4',
    url: 'https://www.youtube.com/watch?v=w2Mvky1rio8',
    category: 'angular interview',
  },
  {
    id: 11,
    embedId: 'SYHCP23PRGk',
    title: 'Angular Interview Prep 5',
    url: 'https://www.youtube.com/watch?v=SYHCP23PRGk',
    category: 'angular interview',
  },
  {
    id: 12,
    embedId: 'JR548Nt7r7I',
    title: 'Angular Interview Prep 6',
    url: 'https://www.youtube.com/watch?v=JR548Nt7r7I',
    category: 'angular interview',
  },
  {
    id: 13,
    embedId: 'GuIsHRpp4y4',
    title: 'Angular Interview Prep 7',
    url: 'https://www.youtube.com/watch?v=GuIsHRpp4y4',
    category: 'angular interview',
  },
  {
    id: 14,
    embedId: '8ToYU5SS0z8',
    title: 'Angular Interview Prep 8',
    url: 'https://www.youtube.com/watch?v=8ToYU5SS0z8',
    category: 'angular interview',
  },
  {
    id: 15,
    embedId: 'qHRvtww2V3U',
    title: 'Angular Interview Prep 9',
    url: 'https://www.youtube.com/watch?v=qHRvtww2V3U',
    category: 'angular interview',
  },
  {
    id: 16,
    embedId: 'kVA17khNYvw',
    title: 'Angular Interview Prep 10',
    url: 'https://www.youtube.com/watch?v=kVA17khNYvw',
    category: 'angular interview',
  },
  {
    id: 17,
    embedId: 'i5gRxiQFupU',
    title: 'Angular Interview Prep 11',
    url: 'https://www.youtube.com/watch?v=i5gRxiQFupU',
    category: 'angular interview',
  },
  {
    id: 18,
    embedId: 'fcZCNSaNTFo',
    title: 'Angular Interview Prep 12',
    url: 'https://www.youtube.com/watch?v=fcZCNSaNTFo',
    category: 'angular interview',
  },
  {
    id: 19,
    embedId: 'NBe9qgUKGyA',
    title: 'Angular Interview Prep 13',
    url: 'https://www.youtube.com/watch?v=NBe9qgUKGyA',
    category: 'angular interview',
  },
  {
    id: 20,
    embedId: 'uo-ysRYnlqU',
    title: 'Angular Interview Prep 14',
    url: 'https://www.youtube.com/watch?v=uo-ysRYnlqU',
    category: 'angular interview',
  },
  {
    id: 21,
    embedId: '9hWvhAiDKqQ',
    title: 'Angular Interview Prep 15',
    url: 'https://www.youtube.com/watch?v=9hWvhAiDKqQ',
    category: 'angular interview',
  },
  {
    id: 22,
    embedId: 'Z0A7FjGXna8',
    title: 'Angular Interview Prep 16',
    url: 'https://www.youtube.com/watch?v=Z0A7FjGXna8',
    category: 'angular interview',
  },
  {
    id: 23,
    embedId: '9mE02hYx4Sk',
    title: 'Angular Interview Prep 17',
    url: 'https://www.youtube.com/watch?v=9mE02hYx4Sk',
    category: 'angular interview',
  },
  {
    id: 24,
    embedId: '-0exw-9YJBo',
    title: 'MERN Project Series - Part 1',
    url: 'https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm',
    category: 'mern project',
    playlistId: 'mern-project',
  },
  {
    id: 25,
    embedId: 'enopDSs3DRw',
    title: 'MERN Project Series - Part 2',
    url: 'https://www.youtube.com/watch?v=enopDSs3DRw&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=2',
    category: 'mern project',
    playlistId: 'mern-project',
  },
  {
    id: 26,
    embedId: 'mvfsC66xqj0',
    title: 'MERN Project Series - Part 3',
    url: 'https://www.youtube.com/watch?v=mvfsC66xqj0&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=3',
    category: 'mern project',
    playlistId: 'mern-project',
  },
  {
    id: 27,
    embedId: 'UXjMo25Nnvc',
    title: 'MERN Project Series - Part 4',
    url: 'https://www.youtube.com/watch?v=UXjMo25Nnvc&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=4&pbjreload=102',
    category: 'mern project',
    playlistId: 'mern-project',
  },
  {
    id: 28,
    embedId: '6E0opAOTd8U',
    title: 'Dotnet Interview Prep 1',
    url: 'https://www.youtube.com/watch?v=6E0opAOTd8U',
    category: 'dotnet interview',
  },
  {
    id: 29,
    embedId: 'd9P-0J6AxKM',
    title: 'Dotnet Interview Prep 2',
    url: 'https://www.youtube.com/watch?v=d9P-0J6AxKM',
    category: 'dotnet interview',
  },
  {
    id: 30,
    embedId: 'V_iSgFBwyec',
    title: 'Dotnet Interview Prep 3',
    url: 'https://www.youtube.com/watch?v=V_iSgFBwyec',
    category: 'dotnet interview',
  },
  {
    id: 31,
    embedId: 'E3RcrokSrVs',
    title: 'Dotnet Interview Prep 4',
    url: 'https://www.youtube.com/watch?v=E3RcrokSrVs',
    category: 'dotnet interview',
  },
  {
    id: 32,
    embedId: 'Qi9sWz4Q0ts',
    title: 'Dotnet Interview Prep 5',
    url: 'https://www.youtube.com/watch?v=Qi9sWz4Q0ts',
    category: 'dotnet interview',
  },
  {
    id: 33,
    embedId: '5MMOKTWelV8',
    title: 'Dotnet Interview Prep 6',
    url: 'https://www.youtube.com/watch?v=5MMOKTWelV8',
    category: 'dotnet interview',
  },
  {
    id: 34,
    embedId: 'QXq1uwZuveE',
    title: 'Dotnet Interview Prep 7',
    url: 'https://www.youtube.com/watch?v=QXq1uwZuveE',
    category: 'dotnet interview',
  },
  {
    id: 35,
    embedId: 'v9qfXiHcqKk',
    title: 'Dotnet Interview Prep 8',
    url: 'https://www.youtube.com/watch?v=v9qfXiHcqKk',
    category: 'dotnet interview',
  },
  {
    id: 36,
    embedId: '5cA4qejWQr0',
    title: 'Dotnet Interview Prep 9',
    url: 'https://www.youtube.com/watch?v=5cA4qejWQr0',
    category: 'dotnet interview',
  },
  {
    id: 37,
    embedId: 'm9zeJPBL8yE',
    title: 'Dotnet Interview Prep 10',
    url: 'https://www.youtube.com/watch?v=m9zeJPBL8yE',
    category: 'dotnet interview',
  },
  {
    id: 38,
    embedId: 'jdkH_WoXmgw',
    title: 'Dotnet Interview Prep 11',
    url: 'https://www.youtube.com/watch?v=jdkH_WoXmgw',
    category: 'dotnet interview',
  },
  {
    id: 39,
    embedId: 'VTOatLuJpSQ',
    title: 'Dotnet Interview Prep 12',
    url: 'https://www.youtube.com/watch?v=VTOatLuJpSQ',
    category: 'dotnet interview',
  },
  {
    id: 40,
    embedId: '8lXXN98AwRw',
    title: 'Dotnet Interview Prep 13',
    url: 'https://www.youtube.com/watch?v=8lXXN98AwRw',
    category: 'dotnet interview',
  },
  {
    id: 41,
    embedId: 'D9t7A4YiTX4',
    title: 'Dotnet Interview Prep 14',
    url: 'https://www.youtube.com/watch?v=D9t7A4YiTX4',
    category: 'dotnet interview',
  },
  {
    id: 42,
    embedId: 'msCiVeaUKJk',
    title: 'Dotnet Interview Prep 15',
    url: 'https://www.youtube.com/watch?v=msCiVeaUKJk',
    category: 'dotnet interview',
  },
  {
    id: 43,
    embedId: 'B-5OkHFagvg',
    title: 'Dotnet Interview Prep 16',
    url: 'https://www.youtube.com/watch?v=B-5OkHFagvg',
    category: 'dotnet interview',
  },
  {
    id: 44,
    embedId: 'uqDsBXurg1g',
    title: 'Dotnet Interview Prep 17',
    url: 'https://www.youtube.com/watch?v=uqDsBXurg1g',
    category: 'dotnet interview',
  },
  {
    id: 45,
    embedId: 'pT9DVFBocIU',
    title: 'Dotnet Interview Prep 18',
    url: 'https://www.youtube.com/watch?v=pT9DVFBocIU',
    category: 'dotnet interview',
  },
  {
    id: 46,
    embedId: 'V1woAGN69-U',
    title: 'Dotnet Interview Prep 19',
    url: 'https://www.youtube.com/watch?v=V1woAGN69-U',
    category: 'dotnet interview',
  },
  {
    id: 47,
    embedId: 'hRbEUC0TyIs',
    title: 'Dotnet Interview Prep 20',
    url: 'https://www.youtube.com/watch?v=hRbEUC0TyIs',
    category: 'dotnet interview',
  },
  {
    id: 48,
    embedId: 'e93zGFanJaQ',
    title: 'Dotnet Interview Prep 21',
    url: 'https://www.youtube.com/watch?v=e93zGFanJaQ',
    category: 'dotnet interview',
  },
  {
    id: 49,
    embedId: 'z8YB3kaI_jM',
    title: 'Dotnet Interview Prep 22',
    url: 'https://www.youtube.com/watch?v=z8YB3kaI_jM',
    category: 'dotnet interview',
  },
  {
    id: 50,
    embedId: 'aWwYgKuPKsw',
    title: 'Dotnet Interview Prep 23',
    url: 'https://www.youtube.com/watch?v=aWwYgKuPKsw',
    category: 'dotnet interview',
  },
  {
    id: 51,
    embedId: 'le8U_HHZxVU',
    title: 'Dotnet Interview Prep 24',
    url: 'https://www.youtube.com/watch?v=le8U_HHZxVU',
    category: 'dotnet interview',
  },
  {
    id: 52,
    embedId: 'B6-O5jwd9Ak',
    title: 'Dotnet Interview Prep 25',
    url: 'https://www.youtube.com/watch?v=B6-O5jwd9Ak',
    category: 'dotnet interview',
  },
  {
    id: 53,
    embedId: 'yOrAI7NUyRw',
    title: 'Dotnet Interview Prep 26',
    url: 'https://www.youtube.com/watch?v=yOrAI7NUyRw',
    category: 'dotnet interview',
  },
  {
    id: 54,
    embedId: 'JdYa4lK7ZyM',
    title: 'Dotnet Interview Prep 27',
    url: 'https://www.youtube.com/watch?v=JdYa4lK7ZyM',
    category: 'dotnet interview',
  },
  {
    id: 55,
    embedId: 'LwjbNO77ODk',
    title: 'Dotnet Interview Prep 28',
    url: 'https://www.youtube.com/watch?v=LwjbNO77ODk',
    category: 'dotnet interview',
  },
  {
    id: 56,
    embedId: 'w1OWHrpmiZo',
    title: 'Dotnet Interview Prep 29',
    url: 'https://www.youtube.com/watch?v=w1OWHrpmiZo',
    category: 'dotnet interview',
  },
  {
    id: 57,
    embedId: 'gbwkj1uKCd0',
    title: 'Dotnet Interview Prep 30',
    url: 'https://www.youtube.com/watch?v=gbwkj1uKCd0',
    category: 'dotnet interview',
  },
  {
    id: 58,
    embedId: 'fz6IYd3xS44',
    title: 'Dotnet Interview Prep 31',
    url: 'https://www.youtube.com/watch?v=fz6IYd3xS44',
    category: 'dotnet interview',
  },
  {
    id: 59,
    embedId: 'HUzmqtmbBxU',
    title: 'Dotnet Interview Prep 32',
    url: 'https://www.youtube.com/watch?v=HUzmqtmbBxU',
    category: 'dotnet interview',
  },
  {
    id: 60,
    embedId: 'MKA5YpHjq-E',
    title: 'Dotnet Interview Prep 33',
    url: 'https://www.youtube.com/watch?v=MKA5YpHjq-E',
    category: 'dotnet interview',
  },
  {
    id: 61,
    embedId: 'lWPWgSZix4A',
    title: 'Dotnet Interview Prep 34',
    url: 'https://www.youtube.com/watch?v=lWPWgSZix4A',
    category: 'dotnet interview',
  },
  {
    id: 62,
    embedId: '6fXH_1kE-NU',
    title: 'Dotnet Interview Prep 35',
    url: 'https://www.youtube.com/watch?v=6fXH_1kE-NU',
    category: 'dotnet interview',
  },
  {
    id: 63,
    embedId: 'bTwp2KUXbqE',
    title: 'Dotnet Interview Prep 36',
    url: 'https://www.youtube.com/watch?v=bTwp2KUXbqE',
    category: 'dotnet interview',
  },
  {
    id: 64,
    embedId: 'gQTay5gEBYk',
    title: 'Dotnet Interview Prep 37',
    url: 'https://www.youtube.com/watch?v=gQTay5gEBYk',
    category: 'dotnet interview',
  },
  {
    id: 65,
    embedId: 'JlavlqNoSKk',
    title: 'Dotnet Interview Prep 38',
    url: 'https://www.youtube.com/watch?v=JlavlqNoSKk',
    category: 'dotnet interview',
  },
  {
    id: 66,
    embedId: 'hcIu5TCZ3a8',
    title: 'Dotnet Interview Prep 39',
    url: 'https://www.youtube.com/watch?v=hcIu5TCZ3a8',
    category: 'dotnet interview',
  },
  {
    id: 67,
    embedId: '37ziupvwx3U',
    title: 'Dotnet Interview Prep 40',
    url: 'https://www.youtube.com/watch?v=37ziupvwx3U',
    category: 'dotnet interview',
  },
  {
    id: 68,
    embedId: 'RtLmDgtDNJs',
    title: 'Dotnet Interview Prep 41',
    url: 'https://www.youtube.com/watch?v=RtLmDgtDNJs',
    category: 'dotnet interview',
  },
  {
    id: 69,
    embedId: 'KKSM-67jSk4',
    title: 'Dotnet Interview Prep 42',
    url: 'https://www.youtube.com/watch?v=KKSM-67jSk4',
    category: 'dotnet interview',
  },
  {
    id: 70,
    embedId: 'q8rl1pHFCBo',
    title: 'Dotnet Interview Prep 43',
    url: 'https://www.youtube.com/watch?v=q8rl1pHFCBo',
    category: 'dotnet interview',
  },
  {
    id: 71,
    embedId: 'Cj6alXpnEe8',
    title: 'Dotnet Interview Prep 44',
    url: 'https://www.youtube.com/watch?v=Cj6alXpnEe8',
    category: 'dotnet interview',
  },
  {
    id: 72,
    embedId: 'zPXgRwuoILQ',
    title: 'Dotnet Interview Prep 45',
    url: 'https://www.youtube.com/watch?v=zPXgRwuoILQ',
    category: 'dotnet interview',
  },
  {
    id: 73,
    embedId: 'hrTQipWp6co',
    title: 'Git Video 1',
    url: 'https://www.youtube.com/watch?v=hrTQipWp6co',
    category: 'git',
  },
  {
    id: 74,
    embedId: '1ibmWyt8hfw',
    title: 'Git Video 2',
    url: 'https://www.youtube.com/watch?v=1ibmWyt8hfw',
    category: 'git',
  },
];

const readSavedVideoState = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    return JSON.parse(window.localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
};

const formatCategory = (category) =>
  category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getVideoState = (videoState, id) => videoState[id] || {};

const YouTube = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState('newest');
  const [featuredId, setFeaturedId] = useState(videos[0].id);
  const [videoState, setVideoState] = useState(readSavedVideoState);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(videoState));
  }, [videoState]);

  const categories = useMemo(() => ['all', ...new Set(videos.map((video) => video.category))], []);

  const categoryCounts = useMemo(
    () =>
      videos.reduce(
        (counts, video) => ({
          ...counts,
          [video.category]: (counts[video.category] || 0) + 1,
        }),
        { all: videos.length },
      ),
    [],
  );

  const filteredVideos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchedVideos = videos.filter((video) => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        [video.title, video.category, video.embedId, video.url]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return [...matchedVideos].sort((firstVideo, secondVideo) => {
      const firstState = getVideoState(videoState, firstVideo.id);
      const secondState = getVideoState(videoState, secondVideo.id);

      if (sortMode === 'title') {
        return firstVideo.title.localeCompare(secondVideo.title);
      }

      if (sortMode === 'category') {
        return firstVideo.category.localeCompare(secondVideo.category) || firstVideo.id - secondVideo.id;
      }

      if (sortMode === 'favorites') {
        return Number(Boolean(secondState.favorite)) - Number(Boolean(firstState.favorite)) || firstVideo.id - secondVideo.id;
      }

      if (sortMode === 'unwatched') {
        return Number(Boolean(firstState.watched)) - Number(Boolean(secondState.watched)) || firstVideo.id - secondVideo.id;
      }

      return secondVideo.id - firstVideo.id;
    });
  }, [searchTerm, selectedCategory, sortMode, videoState]);

  const featuredVideo = videos.find((video) => video.id === featuredId) || filteredVideos[0] || videos[0];
  const featuredIndex = filteredVideos.findIndex((video) => video.id === featuredVideo.id);
  const canNavigateFeatured = filteredVideos.length > 1 && featuredIndex >= 0;

  useEffect(() => {
    if (filteredVideos.length > 0 && !filteredVideos.some((video) => video.id === featuredId)) {
      setFeaturedId(filteredVideos[0].id);
    }
  }, [featuredId, filteredVideos]);

  const showFeaturedVideoAtOffset = (offset) => {
    if (!canNavigateFeatured) {
      return;
    }

    const nextIndex = (featuredIndex + offset + filteredVideos.length) % filteredVideos.length;
    setFeaturedId(filteredVideos[nextIndex].id);
  };

  const groupedVideos = useMemo(() => {
    const groups = [];

    filteredVideos.forEach((video) => {
      const groupId = video.playlistId || video.category;
      let group = groups.find((currentGroup) => currentGroup.id === groupId);

      if (!group) {
        group = {
          id: groupId,
          playlist: video.playlistId ? playlists[video.playlistId] : null,
          title: video.playlistId ? null : formatCategory(video.category),
          videos: [],
        };
        groups.push(group);
      }

      group.videos.push(video);
    });

    return groups;
  }, [filteredVideos]);

  const updateVideoState = (id, changes) => {
    setVideoState((currentState) => ({
      ...currentState,
      [id]: {
        ...getVideoState(currentState, id),
        ...changes,
      },
    }));
  };

  const watchedCount = videos.filter((video) => getVideoState(videoState, video.id).watched).length;
  const favoriteCount = videos.filter((video) => getVideoState(videoState, video.id).favorite).length;

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center text-white`}>
          YouTube Videos
        </h2>
        <p className={`${styles.sectionSubText} text-center text-gray-300`}>
          Watch my favorite videos
        </p>
        <p className="mt-3 text-sm sm:text-base text-blue-600 font-poppins">
          {filteredVideos.length} of {videos.length} videos | {watchedCount} watched | {favoriteCount} favorites
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        <div className="glass-card overflow-hidden rounded-lg">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${featuredVideo.embedId}`}
              title={featuredVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        <div className="glass-card rounded-lg p-5 flex flex-col justify-between gap-5">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/70 text-white">
              {featuredVideo.category}
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white">{featuredVideo.title}</h3>
            <p className="mt-3 text-sm text-gray-300 font-poppins">
              Use this as your focused watch area, then mark videos watched or save notes from the cards below.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => showFeaturedVideoAtOffset(-1)}
              disabled={!canNavigateFeatured}
              className="glass-button px-4 py-2 rounded-full text-sm text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => showFeaturedVideoAtOffset(1)}
              disabled={!canNavigateFeatured}
              className="glass-button px-4 py-2 rounded-full text-sm text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <a
              href={featuredVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-active px-4 py-2 rounded-full text-sm text-white"
            >
              Watch on YouTube &rarr;
            </a>
            <button
              type="button"
              onClick={() =>
                updateVideoState(featuredVideo.id, {
                  watched: !getVideoState(videoState, featuredVideo.id).watched,
                })
              }
              className="glass-button px-4 py-2 rounded-full text-sm text-gray-200"
            >
              {getVideoState(videoState, featuredVideo.id).watched ? 'Watched' : 'Mark watched'}
            </button>
          </div>
          {filteredVideos.length > 0 && featuredIndex >= 0 && (
            <p className="text-xs text-gray-400">
              Video {featuredIndex + 1} of {filteredVideos.length}
            </p>
          )}
        </div>
      </div>

      <div className="glass-card rounded-lg p-4 sm:p-5 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
          <label className="block">
            <span className="sr-only">Search videos</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search videos, categories, or IDs"
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
            />
          </label>

          <label className="block">
            <span className="sr-only">Sort videos</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-blue-300"
            >
              <option className="text-black" value="newest">Newest added</option>
              <option className="text-black" value="title">Title</option>
              <option className="text-black" value="category">Category</option>
              <option className="text-black" value="favorites">Favorites first</option>
              <option className="text-black" value="unwatched">Unwatched first</option>
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'glass-button-active text-white'
                  : 'glass-button text-gray-300'
              }`}
            >
              {formatCategory(category)} ({categoryCounts[category] || 0})
            </button>
          ))}
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="glass-card rounded-lg p-8 text-center text-gray-300">
          No videos match your filters.
        </div>
      ) : (
        <div className="space-y-8">
          {groupedVideos.map((group) => (
            <section key={group.id}>
              {(group.playlist || group.title) && (
                <div className="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{group.playlist?.title || group.title}</h3>
                    {group.playlist && <p className="text-sm text-gray-300">{group.playlist.description}</p>}
                  </div>
                  {group.playlist && (
                    <a
                      href={group.playlist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button-active px-4 py-2 rounded-full text-sm text-white text-center"
                    >
                      Open Playlist
                    </a>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {group.videos.map((video) => {
                  const currentState = getVideoState(videoState, video.id);

                  return (
                    <article
                      key={video.id}
                      className="glass-card rounded-lg overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2 py-1 bg-blue-500/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase">
                          {video.category}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFeaturedId(video.id)}
                        className="block w-full text-left"
                        aria-label={`Feature ${video.title}`}
                      >
                        <div className="aspect-video bg-black">
                          <img
                            src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </button>

                      <div className="p-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-3">{video.title}</h3>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => updateVideoState(video.id, { watched: !currentState.watched })}
                            className={`px-3 py-2 rounded-lg text-xs font-medium ${
                              currentState.watched ? 'glass-button-active text-white' : 'glass-button text-gray-200'
                            }`}
                          >
                            {currentState.watched ? 'Watched' : 'Mark watched'}
                          </button>
                          <button
                            type="button"
                            onClick={() => updateVideoState(video.id, { favorite: !currentState.favorite })}
                            className={`px-3 py-2 rounded-lg text-xs font-medium ${
                              currentState.favorite ? 'glass-button-active text-white' : 'glass-button text-gray-200'
                            }`}
                          >
                            {currentState.favorite ? 'Saved' : 'Favorite'}
                          </button>
                        </div>

                        <textarea
                          value={currentState.notes || ''}
                          onChange={(event) => updateVideoState(video.id, { notes: event.target.value })}
                          placeholder="Notes for this video"
                          rows="3"
                          className="w-full resize-y rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
                        />

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setFeaturedId(video.id)}
                            className="text-blue-300 hover:text-blue-100 text-sm transition-colors"
                          >
                            Feature
                          </button>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-100 text-sm transition-colors"
                          >
                            YouTube &rarr;
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTube;
