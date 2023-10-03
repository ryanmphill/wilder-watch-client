import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import CreateStudyForm from './CreateStudyForm';
import * as regionFetchCalls from '../../managers/RegionManager';
import * as studyTypeFetchCalls from '../../managers/StudyTypeManager';
import * as studyFetchCalls from '../../managers/StudyManager';
import { beforeEach, vi } from 'vitest';
import EditStudyForm from './EditStudyForm';


// Set up mock API endpoints
vi.mock('../../managers/RegionManager')
vi.mock('../../managers/StudyTypeManager')
vi.mock('../../managers/StudyManager')

describe('Render Create Study Form', () => {
    beforeEach(() => vi.clearAllMocks());
    it('Should render the create study form with all necessary labels', async () => {

        // Set up mock api endpoints
        studyTypeFetchCalls.getAllStudyTypes.mockResolvedValue([{id: 1, label: "Ecological"}])
        regionFetchCalls.getAllRegions.mockResolvedValue([{id: 1, label: "North America"}])


        render(<CreateStudyForm title="CreateStudyForm" />, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(screen.getByLabelText('Title:')).toBeInTheDocument();
            expect(screen.getByLabelText('Subject:')).toBeInTheDocument();
            expect(screen.getByLabelText('Summary:')).toBeInTheDocument();
            expect(screen.getByLabelText('Details:')).toBeInTheDocument();
            expect(screen.getByLabelText('Start Date:')).toBeInTheDocument();
            expect(screen.getByLabelText('End Date:')).toBeInTheDocument();
            expect(screen.getByLabelText('Study Type:')).toBeInTheDocument();
            expect(screen.getByLabelText('Where is your study taking place?:')).toBeInTheDocument();
            expect(screen.getByLabelText('Image Url:')).toBeInTheDocument();
        })

        // check if CreateStudyForm component renders properly with labels displayed
    });
});

describe('Create Study Form Validation', () => {
    beforeEach(() => vi.clearAllMocks());
    it('Should render error messages when submitting a blank form', async () => {

        // Set up mock api endpoints
        studyTypeFetchCalls.getAllStudyTypes.mockResolvedValue([{id: 1, label: "Ecological"}])
        regionFetchCalls.getAllRegions.mockResolvedValue([{id: 1, label: "North America"}])

        const user = userEvent.setup()

        render(<CreateStudyForm title="CreateStudyForm" />, { wrapper: BrowserRouter });

        await user.click(screen.getByRole('button', {name: "Submit"}))

        await waitFor(() => {
            expect(screen.getByText('** Please fill in all of the required fields **')).toBeInTheDocument();
            expect(screen.getByText('** Please select a region **')).toBeInTheDocument();
            expect(screen.getByText('** Please select a study type **')).toBeInTheDocument();
            expect(screen.getByText('** Please provide a starting date **')).toBeInTheDocument();
            expect(screen.getByText('** Please provide some details for your study **')).toBeInTheDocument();
            expect(screen.getByText('** Please include a summary **')).toBeInTheDocument();
            expect(screen.getByText('** Please enter a subject **')).toBeInTheDocument();
            expect(screen.getByText('** Please enter a title **')).toBeInTheDocument();
        })

        // check if CreateStudyForm component renders error messages
    });
});

describe('Render Edit Study Form', () => {
    beforeEach(() => vi.clearAllMocks());
    it('Should render the edit study form with all necessary labels', async () => {

        // Set up mock api endpoints
        studyTypeFetchCalls.getAllStudyTypes.mockResolvedValue([{ id: 1, label: "Ecological" }])
        regionFetchCalls.getAllRegions.mockResolvedValue([{ id: 1, label: "North America" }])
        studyFetchCalls.getSingleStudy.mockResolvedValue({
            title: "test study",
            subject: "test subject",
            summary: "test summary",
            details: "details",
            start_date: "2023-10-02",
            end_date: "",
            study_type: { id: 1 },
            region: { id: 1 },
            image_url: ""
        })

        render(<EditStudyForm title="CreateStudyForm" />, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(screen.getByDisplayValue('test study')).toBeInTheDocument();
            expect(screen.getByLabelText('Title:')).toBeInTheDocument();
            expect(screen.getByLabelText('Subject:')).toBeInTheDocument();
            expect(screen.getByLabelText('Summary:')).toBeInTheDocument();
            expect(screen.getByLabelText('Details:')).toBeInTheDocument();
            expect(screen.getByLabelText('Start Date:')).toBeInTheDocument();
            expect(screen.getByLabelText('End Date:')).toBeInTheDocument();
            expect(screen.getByLabelText('Study Type:')).toBeInTheDocument();
            expect(screen.getByLabelText('Where is your study taking place?:')).toBeInTheDocument();
            expect(screen.getByLabelText('Image Url:')).toBeInTheDocument();
        })

        // check if EditStudyForm component renders properly with labels displayed
    });
});

describe('Load Data For Edit Study Form', () => {
    beforeEach(() => vi.clearAllMocks());
    it('Load the data from the fetched study to be edited', async () => {

        // Set up mock api endpoints
        studyTypeFetchCalls.getAllStudyTypes.mockResolvedValue([{ id: 1, label: "Ecological" }])
        regionFetchCalls.getAllRegions.mockResolvedValue([{ id: 1, label: "North America" }])
        studyFetchCalls.getSingleStudy.mockResolvedValue({
            title: "test study",
            subject: "test subject",
            summary: "test summary",
            details: "test details",
            start_date: "2023-10-02",
            end_date: "",
            study_type: { id: 1 },
            region: { id: 1 },
            image_url: ""
        })

        render(<EditStudyForm title="CreateStudyForm" />, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(screen.getByDisplayValue('test study')).toBeInTheDocument();
            expect(screen.getByDisplayValue('test subject')).toBeInTheDocument();
            expect(screen.getByDisplayValue('test summary')).toBeInTheDocument();
            expect(screen.getByDisplayValue('test details')).toBeInTheDocument();
            expect(screen.getByDisplayValue('2023-10-02')).toBeInTheDocument();
        })

        // check if EditStudyForm component renders properly with labels displayed
    });
});




