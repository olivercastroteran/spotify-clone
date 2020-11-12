import { useState, useEffect } from 'react';
import { db } from '../config/fbConfig';

const useFirestore = (collection) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const unsub = db.collection(collection).onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setPlaylists(documents);
    });
    return () => unsub();
  }, [collection]);

  return { playlists };
};

export default useFirestore;
