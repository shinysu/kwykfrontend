import React from "react";
import * as constant from '../components/Constants';
import DisplayAlert from '../components/DisplayAlert';
import useFetch from "../hooks/useFetch";

function useGetAttempted(useremail) {
  const topic = sessionStorage.getItem('topic');
  const subtopic = sessionStorage.getItem('subtopic');
  const url = constant.kwykURL+"user_attempts_custom/"+useremail+"/"+topic+"/"+subtopic;
  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});

  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const data = fetchResponse.data;
  const attemptedWords = data['attempted_words'];
  const attemptedCount = attemptedWords.length;
  const totalWords = data['topic_words'];
  const totalWordCount = totalWords.length;
  const skippedWords = data['skipped_words'];
  const skippedWordCount = getUniqueSkips(attemptedWords,skippedWords).length;
  sessionStorage.setItem('userResponses',JSON.stringify(attemptedWords));
  sessionStorage.setItem('skipped', skippedWordCount);
  sessionStorage.setItem('attempted', attemptedCount);
  sessionStorage.setItem('totalWordCount', totalWordCount);
}

export default useGetAttempted;

function getUniqueSkips(attemptedWords,skippedWords) {
  skippedWords = Object.values(skippedWords).filter( ( el ) => !Object.values(attemptedWords).includes( el ) );
  return skippedWords;
}
