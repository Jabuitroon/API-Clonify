export const initialState = [
    {
    id: '5',
    albumId: 5,
    title: "Chau Saura Session",
    cover:
      "https://f4.bcbits.com/img/a2793859494_16.jpg",
    artists: ["Chau Saura", "amies", "kyu"],
  },
  {
    id: '6',
    albumId: 6,
    title: "Like a Necessity",
    cover:
      "https://f4.bcbits.com/img/a0363730459_16.jpg",
    artists: ["WFS", "Nadav Cohen"],
  },
  {
    id: '7',
    albumId: 6,
    title: "Like a Necessity",
    cover:
      "https://f4.bcbits.com/img/a0363730459_16.jpg",
    artists: ["WFS", "Nadav Cohen"],
  }
]
const PLAYLISTFAV_ACTIONS_CASES = {
    added: 'added',
    deleted: 'deleted'
  }
//   const playlistInFavorites = favoriteList.findIndex((item) => item.id === id)

export function playlistFavReducer( state, action ) {
    const { type: actionType, payload: actionPayload } = action

switch (actionType) {
    case PLAYLISTFAV_ACTIONS_CASES.added :{
        console.log(actionPayload);
        
        return [ ...state, {...actionPayload} ]
    }
    case PLAYLISTFAV_ACTIONS_CASES.deleted :{
        const { id } = actionPayload
        return state.filter(item => item.id !== id)
    }
    }
    return state
}
