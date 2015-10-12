package net.bitacademy.java72.service;

import java.util.List;

import net.bitacademy.java72.domain.LectureEvaluation;


public interface LectureEvaluationService {
  List<LectureEvaluation> list(int pageNo, int pageSize);
  List<LectureEvaluation> result(int pageNo, int pageSize);
  int insert(LectureEvaluation lectureEvaluation);
  int update(LectureEvaluation lectureEvaluation);
  int delete(int no);
  LectureEvaluation get(int no);
  LectureEvaluation getView(int no);
  int updateView(LectureEvaluation lectureEvaluation);
  int countAll();
  
}
