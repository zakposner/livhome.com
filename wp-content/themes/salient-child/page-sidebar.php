<?php 
/*template name: Sidebar*/
get_header(); ?>

<?php nectar_page_header($post->ID); ?>

<div class="container-wrap">
	
	<div class="container main-content">
		
		<div class="row">

			<?php 
				//breadcrumbs
				if ( function_exists( 'yoast_breadcrumb' ) && !is_home() && !is_front_page() ){ yoast_breadcrumb('<p id="breadcrumbs">','</p>'); } 
			 ?>
			
			<div class="post-area col span_8">
				<?php 
				
				if(have_posts()) : while(have_posts()) : the_post(); ?>
					
					<?php the_content(); ?>
	
				<?php endwhile; endif; ?>
				
			</div><!--/span_9-->
			
			<div id="sidebar" class="col span_4 col_last">
				<?php get_sidebar(); ?>
			</div><!--/span_9-->
			
		</div><!--/row-->
		
	</div><!--/container-->

</div><!--/container-wrap-->

<?php get_footer(); ?>