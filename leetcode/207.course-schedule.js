/*
 * @lc app=leetcode id=207 lang=javascript
 *
 * [207] Course Schedule
 *
 * https://leetcode.com/problems/course-schedule/description/
 *
 * algorithms
 * Medium (38.01%)
 * Likes:    1803
 * Dislikes: 88
 * Total Accepted:    221K
 * Total Submissions: 581.4K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * There are a total of n courses you have to take, labeled from 0 to n-1.
 * 
 * Some courses may have prerequisites, for example to take course 0 you have
 * to first take course 1, which is expressed as a pair: [0,1]
 * 
 * Given the total number of courses and a list of prerequisite pairs, is it
 * possible for you to finish all courses?
 * 
 * Example 1:
 * 
 * 
 * Input: 2, [[1,0]] 
 * Output: true
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0. So it is possible.
 * 
 * Example 2:
 * 
 * 
 * Input: 2, [[1,0],[0,1]]
 * Output: false
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0, and to take course 0 you
 * should
 * also have finished course 1. So it is impossible.
 * 
 * 
 * Note:
 * 
 * 
 * The input prerequisites is a graph represented by a list of edges, not
 * adjacency matrices. Read more about how a graph is represented.
 * You may assume that there are no duplicate edges in the input
 * prerequisites.
 * 
 * 
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  const dependancies = {}
  for (let i = 0; i < prerequisites.length; i++) {
    const [course, preReq] = prerequisites[i]

    if (!dependancies[course]) {
      dependancies[course] = { [preReq]: true }
    } else {
      dependancies[course][preReq] = true
    }

    if (checkCircularDependancy(course, dependancies)) {
      return false
    }
  }

  return true
};

function checkCircularDependancy(course, graph, seen = {}) {
  let circularDependancy = false;
  if (graph[course]) {
    if (seen[course]) {
      return true;
    }

    seen[course] = true
    prereqs = Object.keys(graph[course])
    
    prereqs.forEach(prereq => {
      if (checkCircularDependancy(prereq, graph, seen)) {
        circularDependancy = true;
      }
    })
  }
    
  seen[course] = false

  return circularDependancy;
}

