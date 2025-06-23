import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  addDoc,
} from 'firebase/firestore';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { z } from 'zod/v4';

type Context = {
  loading: boolean;
  experienceData?:
    | QueryDocumentSnapshot<DocumentData, DocumentData>[]
    | undefined;
  projectData?: QueryDocumentSnapshot<DocumentData, DocumentData>[] | undefined;
};

const DataContext = React.createContext({ loading: true } as Context);

export function useData() {
  return useContext(DataContext);
}

const firebaseConfig = {
  apiKey: 'AIzaSyC9uXztMLP2coQ_d4ChhhUfYPYbKcEX5Fw',
  authDomain: 'personal-portfolio-f0e74.firebaseapp.com',
  projectId: 'personal-portfolio-f0e74',
  storageBucket: 'personal-portfolio-f0e74.appspot.com',
  messagingSenderId: '531385584932',
  appId: '1:531385584932:web:34f3e13ec22618d7f8b7b1',
  measurementId: 'G-9FL3S8X8GF',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const experienceRef = query(
  collection(db, '/WorkHistory'),
  where('visibility', '==', 'public'),
);

const contactRef = collection(db, '/ContactForm');

const ContactData = z.object({
  name: z.string().default(''),
  email: z.email().default(''),
  message: z.string().default(''),
});

export type ContactData = z.infer<typeof ContactData>;

export const sendContact = (data: ContactData) => {
  return addDoc(contactRef, ContactData.parse(data));
};

export function DataProvider({ children }: { children: ReactNode }): ReactNode {
  const [experienceData, setExperienceData] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getDocs(experienceRef).then((doc) => setExperienceData(doc.docs));
  }, []);

  useEffect(() => {
    if (experienceData != undefined) {
      setLoading(false);
    }
  }, [experienceData]);

  const value = {
    loading,
    experienceData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
