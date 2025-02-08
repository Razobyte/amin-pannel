// import React, { useState } from 'react';
// import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// function Careers() {
//   const [jobs, setJobs] = useState([
//     { id: 1, title: 'Software Engineer', description: 'Develop and maintain software applications.', location: 'Remote', jobType: 'Full-time', salary: '60k-80k', status: 'Open' },
//     { id: 2, title: 'Product Manager', description: 'Lead product development teams.', location: 'New York', jobType: 'Part-time', salary: '50k-70k', status: 'Closed' },
//   ]);

//   const [newJob, setNewJob] = useState({ title: '', description: '', location: '', jobType: '', salary: '', status: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingJobId, setEditingJobId] = useState(null);

//   const handleAddJob = () => {
//     if (newJob.title && newJob.description) {
//       setJobs([
//         ...jobs,
//         { id: jobs.length + 1, ...newJob },
//       ]);
//       setNewJob({ title: '', description: '', location: '', jobType: '', salary: '', status: '' });
//     }
//   };

//   const handleEditJob = (jobId) => {
//     const jobToEdit = jobs.find(job => job.id === jobId);
//     setNewJob({ ...jobToEdit });
//     setIsEditing(true);
//     setEditingJobId(jobId);
//   };

//   const handleSaveJob = () => {
//     setJobs(jobs.map(job =>
//       job.id === editingJobId ? { ...job, ...newJob } : job
//     ));
//     setIsEditing(false);
//     setEditingJobId(null);
//     setNewJob({ title: '', description: '', location: '', jobType: '', salary: '', status: '' });
//   };

//   const handleDeleteJob = (id) => {
//     setJobs(jobs.filter(job => job.id !== id));
//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Careers Management
//       </Typography>

//       {/* Add or Edit Job Listing */}
//       <div style={{ marginBottom: '20px' }}>
//         <TextField
//           label="Job Title"
//           variant="outlined"
//           value={newJob.title}
//           onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
//           sx={{ marginRight: 2 }}
//         />
//         <TextField
//           label="Job Description"
//           variant="outlined"
//           value={newJob.description}
//           onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
//           sx={{ marginRight: 2 }}
//           multiline
//           rows={4}
//         />
//         <TextField
//           label="Location"
//           variant="outlined"
//           value={newJob.location}
//           onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
//           sx={{ marginRight: 2 }}
//         />
//         <FormControl sx={{ marginRight: 2 }}>
//           <InputLabel>Job Type</InputLabel>
//           <Select
//             value={newJob.jobType}
//             onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
//           >
//             <MenuItem value="Full-time">Full-time</MenuItem>
//             <MenuItem value="Part-time">Part-time</MenuItem>
//             <MenuItem value="Remote">Remote</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           label="Salary Range"
//           variant="outlined"
//           value={newJob.salary}
//           onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
//           sx={{ marginRight: 2 }}
//         />
//         <FormControl sx={{ marginRight: 2 }}>
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={newJob.status}
//             onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
//           >
//             <MenuItem value="Open">Open</MenuItem>
//             <MenuItem value="Closed">Closed</MenuItem>
//           </Select>
//         </FormControl>
//         <Button variant="contained" onClick={isEditing ? handleSaveJob : handleAddJob}>
//           {isEditing ? 'Save Changes' : 'Add Job'}
//         </Button>
//       </div>

//       {/* Jobs Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Job Title</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Job Type</TableCell>
//               <TableCell>Salary</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {jobs.map((job) => (
//               <TableRow key={job.id}>
//                 <TableCell>{job.title}</TableCell>
//                 <TableCell>{job.description}</TableCell>
//                 <TableCell>{job.location}</TableCell>
//                 <TableCell>{job.jobType}</TableCell>
//                 <TableCell>{job.salary}</TableCell>
//                 <TableCell>{job.status}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleEditJob(job.id)}
//                     sx={{ marginRight: 1 }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDeleteJob(job.id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default Careers;
