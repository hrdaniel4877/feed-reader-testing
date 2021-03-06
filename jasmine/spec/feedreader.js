/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBeLessThan(1);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have an URL', function() {
            for (i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a name', function() {
            for (i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
         });
    });


    /* A new test suite named "The menu" */
    describe('The Menu', function() {

        var menu = document.getElementsByTagName('body')[0],
            hamburger = document.getElementsByClassName('menu-icon-link')[0];

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('initially is hidden', function() {
            expect(menu.classList.contains('menu-hidden')).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('toggles visibillity when the hamburger icon is clicked', function() {
            hamburger.click();
            expect(menu.classList.contains('menu-hidden')).toBe(false);
            hamburger.click();
            expect(menu.classList.contains('menu-hidden')).toBe(true);
          });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var feedsContainer = document.getElementsByClassName('feed')[0],
            feeds = feedsContainer.getElementsByClassName('entry');

        beforeEach(function(done) {
           loadFeed(0, function() {
               done();
           });
        });

        it('are at least one', function(done) {
           expect(feeds.length).not.toBeLessThan(1);
           done();
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed1,
            feed2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = document.getElementsByClassName('feed')[0].textContent;
                loadFeed(1, function() {
                    feed2 = document.getElementsByClassName('feed')[0].textContent;
                    done();
                });
            });
        });

        it('are different', function(done) {
            expect(feed1).not.toBe(feed2);
            done();
        });
    });
}());
