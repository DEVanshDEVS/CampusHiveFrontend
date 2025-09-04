import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState([])

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(Array.isArray(response) ? response : [])
    } catch (error) {
      console.error('Unable to fetch enrolled courses:', error)
      toast.error('Unable to fetch enrolled courses')
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner" />
        </div>
      ) : enrolledCourses.length === 0 ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Header */}
          <div className="flex rounded-t-lg bg-richblack-500">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {/* Course List */}
          {enrolledCourses.map((course, i, arr) => {
            const firstSection = course.courseContent?.[0]
            const firstSubSection = firstSection?.subSection?.[0]

            return (
              <div
                className={`flex items-center border border-richblack-700 ${
                  i === arr.length - 1 ? 'rounded-b-lg' : ''
                }`}
                key={course._id}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    if (firstSection && firstSubSection) {
                      navigate(
                        `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection._id}`
                      )
                    } else {
                      toast.error('Course content not available yet.')
                    }
                  }}
                >
                  <img
                    src={course.thumbnail || '/default-thumbnail.png'}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.description?.length > 50
                        ? `${course.description.slice(0, 50)}...`
                        : course.description || 'No description'}
                    </p>
                  </div>
                </div>

                <div className="w-1/4 px-2 py-3">
                  {course?.totalDuration || 'N/A'}
                </div>

                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default EnrolledCourses
