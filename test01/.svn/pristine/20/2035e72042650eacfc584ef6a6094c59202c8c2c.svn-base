package net.bitacademy.java72.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.bitacademy.java72.dao.LectureEvaluationDao;
import net.bitacademy.java72.domain.LectureEvaluation;
import net.bitacademy.java72.service.LectureEvaluationService;

@Service
public class LectureEvaluationServiceImpl implements LectureEvaluationService {
  @Autowired LectureEvaluationDao lectureEvaluationDao;
  
  @Override
  public List<LectureEvaluation> list(int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    int startIndex = (pageNo - 1) * pageSize;
    if (startIndex < 0) {
      startIndex = 0;
    }
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    return lectureEvaluationDao.list(paramMap);
  }
  
  @Override
  public List<LectureEvaluation> result(int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    int startIndex = (pageNo - 1) * pageSize;
    if (startIndex < 0) {
      startIndex = 0;
    }
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    return lectureEvaluationDao.result(paramMap);
  }

  @Override
  public int delete(int no) {
    return lectureEvaluationDao.delete(no);
  }
  
  @Override
  public int insert(LectureEvaluation lectureEvaluation) {
    return lectureEvaluationDao.insert(lectureEvaluation);
  }

  @Override
  public int update(LectureEvaluation lectureEvaluation) {
    return lectureEvaluationDao.update(lectureEvaluation);
  }

  @Override
  public LectureEvaluation get(int no) {
    return lectureEvaluationDao.get(no);
  }

  @Override
  public LectureEvaluation getView(int no) {
    return lectureEvaluationDao.get(no);
  }

  @Override
  public int updateView(LectureEvaluation lectureEvaluation) {
    return lectureEvaluationDao.updateView(lectureEvaluation);
  }

  @Override
  public int countAll() {
    return lectureEvaluationDao.countAll();
  }
  
  
  
  
  
}
