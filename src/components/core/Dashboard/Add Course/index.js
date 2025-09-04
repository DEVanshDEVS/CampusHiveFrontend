import React from 'react';
import RenderSteps from './RenderSteps';

export default function AddCourse() {
  return (
    <div className="flex w-full flex-col xl:flex-row gap-x-6">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Add Course</h1>
        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>

      {/* Tips Sidebar - only on xl and up */}
      <div className="hidden xl:block max-w-[400px] flex-shrink-0 sticky top-10 rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
        <ul className="ml-5 list-disc space-y-4 text-xs text-richblack-5">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on the course single page.</li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
}
