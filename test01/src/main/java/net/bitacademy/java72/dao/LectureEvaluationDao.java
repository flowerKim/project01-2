package net.bitacademy.java72.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java72.domain.LectureEvaluation;

public interface LectureEvaluationDao {
  List<LectureEvaluation> list(Map<String, Object> paramMap);
  List<LectureEvaluation> result(Map<String, Object> paramMap);
  int insert(LectureEvaluation lectureEvaluation);
  int update(LectureEvaluation lectureEvaluation);
  int delete(int no);
  LectureEvaluation get(int no);
  LectureEvaluation getView(int no);
  int updateView(LectureEvaluation lectureEvaluation);
  int countAll();

  /*
   * 1. BoardDao.xml에 선언된 네임스페이스 이름과 인터페이스 이름을 같게 한다.
   *  <mapper namespace="net.bitacademy.java72.dao.BoardDao">
   *  이것과 지금 이 파일의 패키지명+클래스명이 위의 네임 스페이스와 같아야 함.
   * 2.SQL 아이디의 이름과 인터페이스 메소드 이름을 같게 한다.
   */
  

  

  
}
